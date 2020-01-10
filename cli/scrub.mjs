// This is a fork of src/tools/printer.mjs
// See it as a rudimentary transformation script of a system that has no plugin.
// This is Babel at its core. You just also see the ugly parts :)

// The objective of this script is to strip dev artifacts, like all ASSERT expressions, and optimize a few things
// that were coded in a very particular pattern.
// The script is obviously overkill for most of what it does but that's fine. I may refine and abstract this. Or not.

import {
  $$A_61, $$A_UC_41,
  $$B_62, $$B_UC_42, $$C_UC_43,
  $$D_64, $$D_UC_44,
  $$E_65, $$E_UC_45, $$G_67,
  $$I_69,
  $$I_UC_49,
  $$L_6C, $$L_UC_4C,
  $$M_6D, $$N_UC_4E,
  $$O_6F, $$O_UC_4F,
  $$P_70,
  $$R_72,
  $$S_73, $$S_UC_53, $$T_74,
  $$U_75, $$W_77, $$X_78
} from "../src/charcodes.mjs";

function assert(a, b, desc) {
  // This is an assert that can be dropped for a build... It confirms hashing assumptions
  // (Will also be an invaluable tool when adding a new node type ;)
  if (a !== b) throw new Error('Expected `' + b + '`, got `' + a + '`; ' + (desc || ''));
}

const SCRUB_OTHERS = process.argv.includes('--no-compat'); // force all occurrences of compatAcorn and compatBabel to false
const SCRUB_ERRORS = process.argv.includes('--strip-errors'); // strip error message contents (wip)
const NATIVE_SYMBOLS = process.argv.includes('--native-symbols'); // Replace `PERF_$` with `%`?
const NO_AST = process.argv.includes('--no-ast'); // drop ast related code from the parser (`AST_*`)

function ArrayExpression(node) {
  assert(node.type, 'ArrayExpression');
  return '[' + node.elements.map((n, i) => n === null ? ',' : ($(n) + ((n.type === 'RestElement' || i === node.elements.length - 1) ? '' : ','))).join(' ') + ']'
}
function ArrayPattern(node) {
  assert(node.type, 'ArrayPattern');
  return '[' + node.elements.map((n, i) => n === null ? ',' : ($(n) + ((n.type === 'RestElement' || i === node.elements.length - 1) ? '' : ','))).join(' ') + ']'
}
function ArrowFunctionExpression(node) {
  assert(node.type, 'ArrowFunctionExpression');
  let body = $(node.body);
  if (node.expression || (node.expression === undefined && node.body.type !== 'BlockStatement') && (
    node.expression.type !== 'Identifier'           // x=>x
    && node.expression.type !== 'Import'            // x=>import()
    && node.expression.type !== 'Super'             // x=>super
    && node.expression.type !== 'MemberExpression'  // x=>x.y
    && node.expression.type !== 'Literal'           // x=>5
    && node.expression.type !== 'CallExpression'    // x=>x()
    && node.expression.type !== 'ArrayExpression'   // x=>[x]
    // && node.expression.type !== 'ObjectExpression'  // {x}           Can not because x=>{} is a block, not objlit
    && node.expression.type !== 'MetaProperty'      // x=>new.target
    && node.expression.type !== 'TaggedTemplateExpression' // x=>foo``
    && node.expression.type !== 'TemplateLiteral'   // x=>`foo`
    && node.expression.type !== 'ThisExpression'    // x=>this
  )) {
    body = '(' + body + ')';
  }

  if (
    node.params.length === 1 &&
    node.params[0].type !== 'AssignmentPattern' &&
    node.params[0].type !== 'ArrayPattern' &&
    node.params[0].type !== 'ObjectPattern' &&
    node.params[0].type !== 'RestElement'
  ) {
    return (node.async ? 'async ' : '') + $(node.params[0]) + ' => ' + body;
  }
  return (node.async ? 'async ' : '') + '(' + node.params.map($).join(', ') + ') => ' + body;
}
function AssignmentExpression(node) {
  assert(node.type, 'AssignmentExpression');
  if (node.left.type === 'ObjectPattern') {
    return '(' + $(node.left) + ' ' + node.operator + ' ' + $(node.right) + ')';
  }

  return $(node.left) + ' ' + node.operator + ' ' + $(node.right);
}
function AssignmentPattern(node) {
  assert(node.type, 'AssignmentPattern');
  return $(node.left) + ' = ' + $(node.right);
}
function AwaitExpression(node) {
  assert(node.type, 'AwaitExpression');
  return 'await (' + $(node.argument) + ')';
}
function BigIntLiteral(node) {
  assert(node.type, 'BigIntLiteral');
  return node.bigint + 'n';
}
function BinaryExpression(node) {
  assert(node.type, 'BinaryExpression');

  let left = $(node.left);
  switch (node.left.type) {
    case 'Identifier':
    case 'Literal':
    case 'MemberExpression':
    case 'CallExpression':
    case 'ArrayExpression':
    case 'MetaProperty':
    case 'TaggedTemplateExpression':
    case 'TemplateLiteral':
    case 'ThisExpression':
      break;
    default:
      left = '(' + left + ')';
  }

  let right = $(node.right);
  switch (node.right.type) {
    case 'Identifier':
    case 'Literal':
    case 'MemberExpression':
    case 'CallExpression':
    case 'ArrayExpression':
    case 'ObjectExpression':
    case 'MetaProperty':
    case 'TaggedTemplateExpression':
    case 'TemplateLiteral':
    case 'ThisExpression':
      break;
    default:
      right = '(' + right + ')';
  }

  return left + ' ' + node.operator + ' ' + right;
}
function BlockStatement(node) {
  assert(node.type, 'BlockStatement');
  return '{\n' + node.body.map($).join('\n') + '\n}';
}
function BooleanLiteral(node) {
  assert(node.type, 'BooleanLiteral');
  return node.value;
}
function BreakStatement(node) {
  assert(node.type, 'BreakStatement');
  return 'break' + (node.label ? ' ' + $(node.label) : '') + ';';
}
function CallExpression(node) {
  assert(node.type, 'CallExpression');

  if (node.callee.type === 'Identifier') {

    if (node.callee.name.startsWith('PERF_')) {
      if (NATIVE_SYMBOLS && node.callee.name.startsWith('PERF_$')) {
        return '%' + node.callee.name.slice('PERF_$'.length) + '(' + node.arguments.map($).join(', ') + ')';
      }
      return '0';
    }

    // The lexer `peek()` is really just a return of a closured variable, and in dev mode some assertions.
    // So for a build, just replace it with the closured variable instead...
    if (node.callee.name === 'peek' || node.callee.name === '_readCache') {
      return 'cache'; // This is the local closure
    }
    // The lexer `peeky()` is really just a local comparison. similar to the `peek()` optimization above
    if (node.callee.name === 'peeky') {
      return 'cache === ' + $(node.arguments[0]);
    }
    // `neof()` is really just `pointer < len`
    if (node.callee.name === 'neof') {
      return 'pointer < len';
    }
    // `eof()` is really just `pointer >= len`
    if (node.callee.name === 'eof') {
      return 'pointer >= len';
    }

    if (node.callee.name === 'sansFlag') {
      // Basically an alias for `(a | b) ^ b`, to unset all bits in a that are set in b
      return '((' + $w(node.arguments[0]) + ' | ' + $w(node.arguments[1]) + ') ^ ' + $w(node.arguments[1]) + ')';
    }
    if (node.callee.name === 'hasAllFlags') {
      // Basically an alias for `(flags1 & flags2) === flags2`, to check whether at least all bits in b are set in a
      return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') === ' + $w(node.arguments[1]) + ')';
    }
    if (node.callee.name === 'hasAnyFlag') {
      // Basically an alias for `(flags1 & flags2) === flags2`, to check whether at least one bit in b is set in a
      return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') !== 0)';
    }
    if (node.callee.name === 'hasNoFlag') {
      // Basically an alias for `(flags1 & flags2) === 0`, to check whether none of the bits in b is set in a
      return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') === 0)';
    }
  }
  // Drop error messages
  // TODO: symbolize them, store them in a local lookup file, build a mechanism to make that all work smoothly
  if (SCRUB_ERRORS && node.callee.type === 'Identifier') {
    if (node.callee.name === 'THROW') {
      return 'THROW(1)';
    }
    if (node.callee.name === 'THROW_TOKEN') {
      return 'THROW_TOKEN(1)';
    }
    if (node.callee.name === 'regexSyntaxError') {
      return 'regexSyntaxError(1)';
    }
    if (node.callee.name === 'updateRegexPotentialError') {
      return 'updateRegexPotentialError(1)';
    }
    if (node.callee.name === 'updateRegexUflagIsIllegal') {
      return 'updateRegexUflagIsIllegal(' + $(node.arguments[0]) + ', 1)';
    }
    if (node.callee.name === 'updateRegexUflagIsMandatory') {
      return 'updateRegexUflagIsMandatory(' + $(node.arguments[0]) + ', 1)';
    }
  }

  if (
    node.callee.type === 'Identifier' // prevents `x()` becoming `(x)()`, but also `async({__proto__: 1, __proto__: 2})`
    || node.callee.type === 'Import'            // import()
    || node.callee.type === 'Super'             // super()
    || node.callee.type === 'MemberExpression'  // x.y()
    || node.callee.type === 'Literal'           // 5()              Probably an error
    || node.callee.type === 'CallExpression'    // x()()
    || node.callee.type === 'ArrayExpression'   // [x]()            Probably an error
    // || node.callee.type === 'ObjectExpression'  // {x}()         Probably an error, but unsafe for block anyways
    || node.callee.type === 'MetaProperty'      // new.target()
    || node.callee.type === 'TaggedTemplateExpression' // foo``()   Probably an error
    || node.callee.type === 'TemplateLiteral'   // `foo`()          Probably an error
    || node.callee.type === 'ThisExpression'    //  this()          Could technically work
  ) {
    return $(node.callee) + '(' + node.arguments.map($).join(', ') + ')';
  }

  return $w(node.callee) + '(' + node.arguments.map($).join(', ') + ')';
}
function CatchClause(node) {
  assert(node.type, 'CatchClause');
  return 'catch ' + (node.param ? $w(node.param) + ' ' : '') + $(node.body);
}
function ClassBody(node) {
  assert(node.type, 'ClassBody');
  return '{\n' + node.body.map($).join('\n') + '\n}';
}
function ClassDeclaration(node) {
  assert(node.type, 'ClassDeclaration');
  return 'class' + (node.id ? ' ' + $(node.id) : '') + (node.superClass ? ' extends (' + $(node.superClass) + ') ' : '') + $(node.body);
}
function ClassExpression(node) {
  assert(node.type, 'ClassExpression');
  return 'class' + (node.id ? ' ' + $(node.id) : '') + (node.superClass ? ' extends (' + $(node.superClass) + ') ' : '') + $(node.body);
}
function ClassMethod(node) {
  assert(node.type, 'ClassMethod');
  assert('value' in node, false);
  // The `ClassMethod` type is only used for babelCompat
  // Babel does not have .value and merges the method node with the function node, different from the estree spec
  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.async ? 'async ' : '') +
    (node.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.key) + ']' : $(node.key)) +
    '(' + node.params.map($).join(', ') + ')' +
    $(node.body) +
    ';'
  );
}
function CommentBlock(node) {
  assert(node.type, 'CommentBlock');
  return '/*' + node.value + '*/';
}
function CommentLine(node) {
  assert(node.type, 'CommentLine');
  return '//' + node.value + '\n';
}
function ConditionalExpression(node) {
  assert(node.type, 'ConditionalExpression');

  let a = $(node.test);
  if (
    node.test.type !== 'Super'                          // super ? b : c  (Error since super is always call or member)
    && node.test.type !== 'Import'                      // import() ? b : c
    && node.test.type !== 'Identifier'                  // y ? b : c
    && node.test.type !== 'Literal'                     // 5 ? b : c
    && node.test.type !== 'MemberExpression'            // x.y ? b : c
    && node.test.type !== 'CallExpression'              // x()() ? b : c
    && node.test.type !== 'ArrayExpression'             // [] ? b : c
    // && node.test.type !== 'ObjectExpression'         // {}  ? b : c  Unsafe if exprstmt
    && node.test.type !== 'MetaProperty'                // new.target ? b : c
    && node.test.type !== 'TaggedTemplateExpression'    // foo``()  ? b : c
    && node.test.type !== 'TemplateLiteral'             // `foo` ? b : c
    && node.test.type !== 'ThisExpression'              // this ? b : c
  // && node.test.type !== 'BinaryExpression'         // a ? x + y : c       TODO: verify whether this is safe
  // && node.test.type !== 'AssignmentExpression'     // x = y ? b : c -> x = (y ? b : c)   Unsafe
  ) {
    a = '(' + a + ')';
  }

  let b = $(node.consequent);
  if (
    node.consequent.type !== 'Super'                          // a ? super : c  (Error since super is always call or member)
    && node.consequent.type !== 'Import'                      // a ? import() : c
    && node.consequent.type !== 'Identifier'                  // a ? y : c
    && node.consequent.type !== 'Literal'                     // a ? 5 : c
    && node.consequent.type !== 'MemberExpression'            // a ? x.y : c
    && node.consequent.type !== 'CallExpression'              // a ? x()() : c
    && node.consequent.type !== 'ArrayExpression'             // a ? [] : c
    && node.consequent.type !== 'ObjectExpression'            // a ? {} : c
    && node.consequent.type !== 'MetaProperty'                // a ? new.target : c
    && node.consequent.type !== 'TaggedTemplateExpression'    // a ? foo``() : c
    && node.consequent.type !== 'TemplateLiteral'             // a ? `foo` : c
    && node.consequent.type !== 'ThisExpression'              // a ? this : c
    && node.consequent.type !== 'BinaryExpression'            // a ? x + y : c
    && node.consequent.type !== 'AssignmentExpression'        // a ? x = y : c
  ) {
    b = '(' + b + ')';
  }

  let c = $(node.alternate);
  if (
    node.alternate.type !== 'Super'                          // a ? b : super     (Error since super is always call or member)
    && node.alternate.type !== 'Import'                      // a ? b : import()
    && node.alternate.type !== 'Identifier'                  // a ? b : y
    && node.alternate.type !== 'Literal'                     // a ? b : 5
    && node.alternate.type !== 'MemberExpression'            // a ? b : x.y
    && node.alternate.type !== 'CallExpression'              // a ? b : x()()
    && node.alternate.type !== 'ArrayExpression'             // a ? b : []
    && node.alternate.type !== 'ObjectExpression'            // a ? b : {}
    && node.alternate.type !== 'MetaProperty'                // a ? b : new.target
    && node.alternate.type !== 'TaggedTemplateExpression'    // a ? b : foo``()
    && node.alternate.type !== 'TemplateLiteral'             // a ? b : `foo`
    && node.alternate.type !== 'ThisExpression'              // a ? b : this
  // && node.alternate.type !== 'BinaryExpression'         // a ? x + y : c     TODO: verify whether this is safe
  // && node.alternate.type !== 'AssignmentExpression'    // a ? b : (x = y)   Unsafe
  ) {
    c = '(' + c + ')';
  }

  return '(' + a + '? ' + b + ' : ' + c + ')';
}
function ContinueStatement(node) {
  assert(node.type, 'ContinueStatement');
  return 'continue' + (node.label ? ' ' + $(node.label) : '') + ';';
}
function DebuggerStatement(node) {
  assert(node.type, 'DebuggerStatement');
  return 'debugger;';
}
function Directive(node) {
  assert(node.type, 'Directive');
  return $(node.value);
}
function DirectiveLiteral(node) {
  assert(node.type, 'DirectiveLiteral');
  return "'" + node.value + "';";
}
function DoWhileStatement(node) {
  assert(node.type, 'DoWhileStatement');
  return 'do ' + $(node.body) + ' while ' + $w(node.test) + ';';
}
function EmptyStatement(node) {
  assert(node.type, 'EmptyStatement');
  return ';';
}
function ExportAllDeclaration(node) {
  assert(node.type, 'ExportAllDeclaration');
  assert(0, 1, 'should not exist anymore');
}
function ExportDefaultDeclaration(node) {
  assert(node.type, 'ExportDefaultDeclaration');
  assert(0, 1, 'should not exist anymore');
}
function ExportNamespaceSpecifier(node) {
  assert(node.type, 'ExportNamespaceSpecifier');
  assert(0, 1, 'should not exist anymore');
}
function ExportNamedDeclaration(node) {
  assert(node.type, 'ExportNamedDeclaration');
  assert(0, 1, 'should not exist anymore');
}
function ExportSpecifier(node) {
  assert(node.type, 'ExportSpecifier');
  assert(0, 1, 'should not exist anymore');
}
function ExpressionStatement(node) {
  assert(node.type, 'ExpressionStatement');
  if (node.directive === undefined && ( // Protect directives from demotion
    node.expression.type === 'ObjectExpression' ||       // {} would be a block if not paren wrapped
    // node.expression.type === 'ArrayExpression' ||     // [{__proto__: 1, __proto__: 2}] Should be fine with semis
    // node.expression.type === 'SequenceExpression' ||  // a,b
    node.expression.type === 'FunctionExpression' ||     // function(){} -> (function(){}) Else it's a decl or illegal
    node.expression.type === 'ClassExpression' ||        // class{} -> (class{}) Else it's a decl or illegal
    // node.expression.type === 'BinaryExpression' ||    // a+b
    // node.expression.type === 'MemberExpression' ||    // a.b
    // node.expression.type === 'Identifier' ||          // foo
    // node.expression.type === 'UnaryExpression' ||     // ~foo
    // node.expression.type === 'CallExpression' ||      // foo()
    // node.expression.type === 'AssignmentExpression'   // a=b
    // node.expression.type === 'MetaExpression'         // new.target
    // TaggedTemplate
    // TemplateLiteral
    // ThisExpression
    (!node.directive && node.expression.type === 'Literal' && typeof node.expression.value === 'string') // Prevent grouped strings of being promoted to directives
  )) {
    // :'(
    let stmt = $w(node.expression) + ';';
    if (stmt === '(1001);') return ';';
    return stmt;
  }
  // if (node.directive === undefined && node.expression.type === 'Literal' && typeof node.expression.value === 'string') {
  //   return '';
  // }
  let stmt = $(node.expression) + ';';
  if (stmt === '1001;') return ';';
  return stmt;
}
function ForInStatement(node) {
  assert(node.type, 'ForInStatement');
  return 'for (' + (node.left.type === 'VariableDeclaration' || node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern' ? $(node.left, undefined, undefined, true) : $w(node.left)) + ' in ' + $(node.right) + ') ' + $(node.body);
}
function ForOfStatement(node) {
  assert(node.type, 'ForOfStatement');
  return 'for ' + (node.await ? 'await ' : '') + '(' + (node.left.type === 'VariableDeclaration' || node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern' ? $(node.left, undefined, undefined, true) : $w(node.left)) + ' of ' + $(node.right) + ') ' + $(node.body);
}
function ForStatement(node) {
  assert(node.type, 'ForStatement');
  return 'for (' + (node.init ? (node.init.type === 'VariableDeclaration' ? $(node.init, undefined, undefined, true) : $w(node.init)) : '') + ';' + (node.test ? $(node.test) : '') + ';' + (node.update ? $(node.update) : '') + ') ' + $(node.body);
}
function FunctionDeclaration(node) {
  assert(node.type, 'FunctionDeclaration');
  let suffix = (NATIVE_SYMBOLS && node.id ? ';allFuncs.push('+node.id.name+');' : '');
  return (
    (node.async ? 'async ' : '') + 'function' + (node.generator ? '*' : '') + (node.id ? ' ' + $(node.id) : '') + '(' + node.params.map($).join(', ') + ') {\n' + node.body.body.map($).join('\n') + '\n}'
  ) + suffix;
}
function FunctionExpression(node) {
  assert(node.type, 'FunctionExpression');
  return (node.async ? 'async ' : '') + 'function' + (node.generator ? '*' : '') + (node.id ? ' ' + $(node.id) : '') + '(' + node.params.map($).join(', ') + ') {\n' + node.body.body.map($).join('\n') + '\n}';
}
function Identifier(node) {
  assert(node.type, 'Identifier');

  let name = node.name;

  switch (name) {
    case '__$lf_flag':
    case '__$start':
    case '__$leaf':
    case '__$group':
      throw new Error('The ident `' + name + '` should only be used as part of an update expression (++x), the build script assumes this');
  }

  return name;
}
function IfStatement(node) {
  assert(node.type, 'IfStatement');
  return 'if ' + $w(node.test) + ' ' + $(node.consequent) + (node.alternate ? ' else ' + $(node.alternate) : '');
}
function Import(node) {
  assert(node.type, 'Import');
  assert(0, 1, 'imports should have been scrubbed');
}
function ImportDeclaration(node) {
  assert(node.type, 'ImportDeclaration');
  assert(0, 1, 'imports should have been scrubbed');
}
function ImportDefaultSpecifier(node) {
  assert(node.type, 'ImportDefaultSpecifier');
  assert(0, 1, 'imports should have been scrubbed');
}
function ImportExpression(node) {
  assert(node.type, 'ImportExpression');
  assert(0, 1, 'imports should have been scrubbed');
}
function ImportNamespaceSpecifier(node) {
  assert(node.type, 'ImportNamespaceSpecifier');
  assert(0, 1, 'imports should have been scrubbed');
}
function ImportSpecifier(node) {
  assert(node.type, 'ImportSpecifier');
  assert(0, 1, 'imports should have been scrubbed');
}
function LabeledStatement(node) {
  assert(node.type, 'LabeledStatement');
  return $(node.label) + ': ' + $(node.body);
}
function Literal(node) {
  assert(node.type, 'Literal');
  switch (typeof node.value) {
    case 'boolean':
      return node.raw;
    case 'number':
      return node.raw;
    case 'string':
      return node.raw;
    case 'object': // regex
      return node.raw;
  }
  throw new Error('fixme; literal type');
}
function LogicalExpression(node) {
  assert(node.type, 'LogicalExpression');

  let left = $(node.left);
  if (
    node.left.type !== 'Super'                          // super && x  (Error since super is always call or member)
    && node.left.type !== 'Import'                      // import() && x
    && node.left.type !== 'Identifier'                  // x && y
    && node.left.type !== 'Literal'                     // 5 && x
    && node.left.type !== 'MemberExpression'            // x.y && z
    && node.left.type !== 'CallExpression'              // x()() && x
    && node.left.type !== 'ArrayExpression'             // [] && x
    // && node.left.type !== 'ObjectExpression'         // {} && x     Block if statement expression so, meh
    && node.left.type !== 'MetaProperty'                // new.target && x
    && node.left.type !== 'TaggedTemplateExpression'    // foo``() && x
    && node.left.type !== 'TemplateLiteral'             // `foo` && x
    && node.left.type !== 'ThisExpression'              // this && x
  ) {
    left = '(' + left + ')';
  }

  let right = $(node.right);
  if (
    node.right.type !== 'Super'                          // x && super  (Error since super is always call or member)
    && node.right.type !== 'Import'                      // x && import()
    && node.right.type !== 'Identifier'                  // x && y
    && node.right.type !== 'Literal'                     // x && 5
    && node.right.type !== 'MemberExpression'            // x && x.y
    && node.right.type !== 'CallExpression'              // x && x()()
    && node.right.type !== 'ArrayExpression'             // x && []
    && node.right.type !== 'ObjectExpression'            // x && {}
    && node.right.type !== 'MetaProperty'                // x && new.target
    && node.right.type !== 'TaggedTemplateExpression'    // x && foo``()
    && node.right.type !== 'TemplateLiteral'             // x && `foo`
    && node.right.type !== 'ThisExpression'              // x && this
  ) {
    right = '(' + right + ')';
  }

  return '(' + left + ' ' + node.operator + ' ' + right + ')';
}
function MemberExpression(node) {
  assert(node.type, 'MemberExpression');
  if (
    node.object.type === 'ObjectExpression' ||              // {}.c -> ({}).c
    node.object.type === 'SequenceExpression' ||            // a,b.c -> (a,b).c
    node.object.type === 'FunctionExpression' ||            // function(){}.c -> (function(){}).c
    node.object.type === 'ClassExpression' ||               // class x{}.b -> (class x{}).b
    node.object.type === 'BinaryExpression' ||              // a+b.c -> (a+b).c
    // node.object.type === 'MemberExpression' ||           // a.b.c -> (a.b).c
    // node.object.type === 'Identifier' ||                 // a.b -> (a).b
    // node.object.type === 'CallExpression' ||             // -> a().b -> (a()).b
    node.object.type === 'UnaryExpression' ||               // `(!t).y`
    node.object.type === 'ArrowFunctionExpression' ||       // ()=>x.y -> (()=>x).y
    node.object.type === 'UpdateExpression' ||              // `(++x)[x]`
    (node.object.type === 'Literal' && typeof node.object.value === 'number') || // `4 .p`
    (node.object.type === 'Identifier' && node.object.name === 'let') || // `(let)[x]`
    node.object.type === 'AssignmentExpression'             // a=b.c -> (a=b).c
  ) {
    return $w(node.object) + (node.computed ? '[' + $(node.property) + ']' : ('.' + $(node.property)));
  } else {
    return $(node.object) + (node.computed ? '[' + $(node.property) + ']' : ('.' + $(node.property)));
  }
}
function MetaProperty(node) {
  assert(node.type, 'MetaProperty');
  return $(node.meta) + '.' + $(node.property);
}
function MethodDefinition(node) {
  assert(node.type, 'MethodDefinition');
  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.value.async ? 'async ' : '') +
    (node.value.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.key) + ']' : $(node.key)) +
    '(' + node.value.params.map($).join(', ') + ')' +
    $(node.value.body) +
    ';'
  );
}
function NewExpression(node) {
  assert(node.type, 'NewExpression');
  if (
    node.callee.type === 'Super'
    || node.callee.type === 'Import'
    || node.callee.type === 'Identifier'
    || node.callee.type === 'Literal'
    || node.callee.type === 'MemberExpression'
    // || node.callee.type === 'CallExpression'           // new x()() -> new (x())()
    || node.callee.type === 'ArrayExpression'             // new []     Runtime error...?
    || node.callee.type === 'ObjectExpression'            // new {}     Runtime error...?
    || node.callee.type === 'MetaProperty'                // new new.target
    // || node.callee.type === 'TaggedTemplateExpression' // new foo``() -> new (foo``)
    || node.callee.type === 'TemplateLiteral'             // new `foo`  Runtime error?
    || node.callee.type === 'ThisExpression'              // new this   (Could be made to work)
  ) {
    return 'new ' + $(node.callee) + '(' + node.arguments.map($).join(', ') + ')';
  }
  return 'new ' + $w(node.callee) + '(' + node.arguments.map($).join(', ') + ')';
}
function NullLiteral(node) {
  assert(node.type, 'NullLiteral');
  return 'null';
}
function NumericLiteral(node) {
  assert(node.type, 'NumericLiteral');
  return node.raw;
}
let x = 0
function ObjectExpression(node) {
  assert(node.type, 'ObjectExpression');
  let arr = node.properties.map((e, i) => $(e, i));
  return '{' + arr.join(', ') + '}';
}
function ObjectMethod(node) {
  assert(node.type, 'ObjectMethod');
  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.value.async ? 'async ' : '') +
    (node.value.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.value.id) + ']' : $(node.value.id)) +
    '(' + $(node.value.params).join(', ') + ')' +
    $(node.value.body) +
    ','
  );
}
function ObjectPattern(node) {
  assert(node.type, 'ObjectPattern');
  return '{' + node.properties.map($).join(', ') + '}';
}
function ObjectProperty(node) {
  assert(node.type, 'ObjectProperty');
  return node.body.map($).join('\n');
}
function Program(node) {
  assert(node.type, 'Program');
  return node.body.map($).join('\n');
}
function Property(node) {
  assert(node.type, 'Property');
  if (SCRUB_OTHERS) {
    // Do not visit the ident otherwise you change `{acornCompat: false}` to `{false: false}`
    if (node.key.type === 'Identifier' && (node.key.name === 'acornCompat' || node.key.name === 'babelCompat')) {
      return node.key.name;
    }
  }
  return (
    (node.kind === 'get' || node.kind === 'set' || node.method) ?
      (
        (node.static ? 'static ' : '') +
        (node.kind === 'get' ? 'get ' : '') +
        (node.kind === 'set' ? 'set ' : '') +
        (node.value.async ? 'async ' : '') +
        (node.value.generator ? '* ' : '') +
        (node.computed ? '[' : '') + $(node.key) + (node.computed ? ']' : '') +
        '(' + node.value.params.map($).join(', ') + ')' +
        $(node.value.body) +
        ''
      ) : (
        (node.shorthand ? '' : ((node.computed ? '[' : '') + $(node.key) + (node.computed ? ']' : '') + ':')) + $(node.value)
      )
  );
}
function RegExpLiteral(node) {
  assert(node.type, 'RegExpLiteral');
  return node.raw;
}
function RestElement(node) {
  assert(node.type, 'RestElement');
  return '...' + $(node.argument);
}
function ReturnStatement(node) {
  assert(node.type, 'ReturnStatement');
  return 'return' + (node.argument ? ' ' + $(node.argument) : '') + ';';
}
function SequenceExpression(node) {
  assert(node.type, 'SequenceExpression');
  return '(' + node.expressions.map($).join(', ') + ')';
}
function SpreadElement(node) {
  assert(node.type, 'SpreadElement');
  return '...' + $(node.argument);
}
function StringLiteral(node) {
  assert(node.type, 'StringLiteral');
  return node.raw;
}
function Super(node) {
  assert(node.type, 'Super');
  return 'super';
}
function SwitchCase(node) {
  assert(node.type, 'SwitchCase');
  return (node.test ? 'case ' + $(node.test) : 'default') + ':\n' + node.consequent.map($).join('\n');
}
function SwitchStatement(node) {
  assert(node.type, 'SwitchStatement');
  return 'switch ' + $w(node.discriminant) + ' {\n' + node.cases.map($).join('\n') + '\n}';
}
function TaggedTemplateExpression(node) {
  assert(node.type, 'TaggedTemplateExpression');
  return $w(node.tag) + $(node.quasi);
}
function TemplateElement(node) {
  assert(node.type, 'TemplateElement');
  return node.value.raw;
}
function TemplateLiteral(node) {
  assert(node.type, 'TemplateLiteral');
  return '`' + $(node.quasis[0]) + (node.expressions.length ? '${' : '') + node.expressions.map((e, i) => $(e) + '}' + $(node.quasis[i+1])).join('${') + '`';
}
function ThisExpression(node) {
  assert(node.type, 'ThisExpression');
  return 'this';
}
function ThrowStatement(node) {
  assert(node.type, 'ThrowStatement');
  return 'throw ' + $(node.argument) + ';';
}
function TryStatement(node) {
  assert(node.type, 'TryStatement');
  return 'try ' + $(node.block) + (node.handler ? ' ' + $(node.handler) : '') + (node.finalizer ? ' finally ' + $(node.finalizer) : '');
}
function UnaryExpression(node) {
  assert(node.type, 'UnaryExpression');

  if (
    node.argument.type === 'Identifier'           // !foo
    || node.argument.type === 'Import'            // !import()
    || node.argument.type === 'Super'             // !super
    || node.argument.type === 'MemberExpression'  // !x.y
    || node.argument.type === 'Literal'           // !5
    || node.argument.type === 'CallExpression'    // !x()
    || node.argument.type === 'ArrayExpression'   // ![x]
    || node.argument.type === 'ObjectExpression'  // !{x}
    || node.argument.type === 'MetaProperty'      // !new.target
    || node.argument.type === 'TaggedTemplateExpression' // ! foo`x`
    || node.argument.type === 'TemplateLiteral'   // !`foo`
    || node.argument.type === 'ThisExpression'    // !this
  ) {
    return node.operator + ('!+-~'.includes(node.operator)?'':' ') + $(node.argument);
  }

  return node.operator + ('!+-~'.includes(node.operator)?'':' ') + $w(node.argument);
}
function UpdateExpression(node) {
  assert(node.type, 'UpdateExpression');

  return (node.prefix ? node.operator : '') + $(node.argument) + (node.prefix ? '' : node.operator);
}
function VariableDeclaration(node, fromFor) {
  assert(node.type, 'VariableDeclaration');
  assert(node.declarations.length, 1, 'coding style uses only one binding per declaration (counting a whole destructuring as one) `' + (node.declarations.length !== 1 && (node.kind + ' ' + node.declarations.map($).join(', '))) + '`');
  return node.kind + ' ' + node.declarations.map($).join(', ') + (fromFor ? '' : ';'); // no semi inside `for`
}
function VariableDeclarator(node) {
  assert(node.type, 'VariableDeclarator');

  return $(node.id) + (node.init ? ' = ' + $(node.init) : '');
}
function WhileStatement(node) {
  assert(node.type, 'WhileStatement');
  return 'while ' + $w(node.test) + ' ' + $(node.body);
}
function WithStatement(node) {
  assert(node.type, 'WithStatement');
  return 'with ' + $w(node.object) + ' ' + $(node.body);
}
function YieldExpression(node) {
  assert(node.type, 'YieldExpression');
  return '(yield' + (node.delegate ? ' *' : '') + (node.argument ? ' ' + $w(node.argument) : '') + ')';
}

function $w(node) {
  return '(' + $(node) + ')';
}
let jumpTable = [
  (node, fromFor, type, c) => {
    if (c === $$I_69) return Directive(node);
    if (c === $$X_78) return ExportDefaultDeclaration(node);
    return UpdateExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(3);
    if (c === $$L_6C) return BooleanLiteral(node);
    if (c === $$I_UC_49) return ForInStatement(node);
    if (c === $$O_UC_4F) return ForOfStatement(node);
    return UnaryExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AssignmentPattern(node);
    if (c === $$B_UC_42) return BlockStatement(node);
    return ImportSpecifier(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$A_61) return ClassExpression(node);
    if (c === $$M_6D) return CommentBlock(node);
    if (c === $$P_70) return EmptyStatement(node);
    return ForStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$G_67) return BigIntLiteral(node);
    if (c === $$M_6D) return CommentLine(node);
    return WithStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return ArrowFunctionExpression(node);
    return ClassBody(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(4);
    if (c === $$T_74) return FunctionDeclaration(node);
    if (c === $$E_UC_45) return ThisExpression(node);
    if (c === $$W_77) return ThrowStatement(node);
    if (c === $$E_65) return WhileStatement(node);
    return YieldExpression(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$S_73) return AssignmentExpression(node);
    if (c === $$L_6C) return ClassMethod(node);
    return FunctionExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$N_UC_4E) return NewExpression(node);
    return RegExpLiteral(node);
  },
  (node, fromFor, type, c) => {
    return MetaProperty(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(8);
    if (c === $$U_75) return CatchClause(node);
    if (c === $$A_61) return ReturnStatement(node);
    if (c === $$E_UC_45) return TemplateElement(node);
    return TemplateLiteral(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExpressionStatement(node);
    return Import(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportAllDeclaration(node);
    return ObjectProperty(node);
  },
  (node, fromFor, type, c) => {
    return IfStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportNamedDeclaration(node);
    if (c === $$D_64) return Identifier(node);
    if (c === $$I_69) return Literal(node);
    if (c === $$B_62) return ObjectMethod(node);
    return RestElement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$A_61) return CallExpression(node);
    return ObjectPattern(node);
  },
  (node, fromFor, type, c) => {
    return Super(node);
  },
  (node, fromFor, type, c) => {
    return LabeledStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$B_62) return ObjectExpression(node);
    return VariableDeclaration(node, fromFor);
  },
  (node, fromFor, type, c) => {
    return VariableDeclarator(node);
  },
  (node, fromFor, type, c) => {
    return DebuggerStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$P_70) return ImportNamespaceSpecifier(node);
    if (c === $$M_6D) return MemberExpression(node);
    if (c === $$T_74) return MethodDefinition(node);
    return Program(node);
  },
  (node, fromFor, type, c) => {
    // (nothing)
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportSpecifier(node);
    return SequenceExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AwaitExpression(node);
    return SwitchStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$B_UC_42) return BinaryExpression(node);
    if (c === $$D_UC_44) return DirectiveLiteral(node);
    if (c === $$S_UC_53) return StringLiteral(node);
    return TaggedTemplateExpression(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$O_6F) return ConditionalExpression(node);
    return Property(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$M_6D) return ImportDefaultSpecifier(node);
    return NumericLiteral(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return BreakStatement(node);
    if (c === $$L_6C) return ClassDeclaration(node);
    return ImportDeclaration(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return ArrayExpression(node);
    if (c === $$M_6D) return ImportExpression(node);
    if (c === $$P_70) return SpreadElement(node);
    return SwitchCase(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return ArrayPattern(node);
    if (c === $$C_UC_43) return ContinueStatement(node);
    if (c === $$L_UC_4C) return LogicalExpression(node);
    if (c === $$N_UC_4E) return NullLiteral(node);
    return TryStatement(node);
  },
  (node, fromFor, type, c) => {
    return DoWhileStatement(node);
  },
];
function $(node, _, __, fromFor) {
  // This is a walker that was (manually) built using a simple hash, as follows:

  // Input file is a text file with every node name, one per line

  // Get distribution
  // var x=1; require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(x)-96; if (!map[p]) map[p] = 0; ++map[p]; return map   }, {})

  // Get node names per bucket
  // var x=6; var obj=require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(s.length-x)-96; if (!map[p]) map[p] = []; map[p].push(s); return map }, {});

  // This breaks down the 83 node names into an almost perfect 31 case hash, within 5bit, where each bucket has at most 5 elements
  let type = node.type;
  let c = type.charCodeAt(1); // We can use the second character as a second hash in some of these :)
  let hash = type.length ^ c - 96;
  return jumpTable[hash](node, fromFor, type, c);
}

function scrub(node) {
  return $(node);
}

export {
  scrub,
};

