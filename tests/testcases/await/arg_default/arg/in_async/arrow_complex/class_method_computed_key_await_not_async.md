# Tenko parser test case

- Path: tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_await_not_async.md

> :: await : arg default : arg : in async : arrow complex
>
> ::> class method computed key await not async
>
> This only fails in module goal because `await` is only considered a keyword in an async context or the module goal

## Input

`````js
(fail = class A {[await](){}; "x"(){}}) => {}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:45},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:45},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:45},source:''},
        params: [
          {
            type: 'AssignmentPattern',
            loc:{start:{line:1,column:1},end:{line:1,column:38},source:''},
            left: {
              type: 'Identifier',
              loc:{start:{line:1,column:1},end:{line:1,column:5},source:''},
              name: 'fail'
            },
            right: {
              type: 'ClassExpression',
              loc:{start:{line:1,column:8},end:{line:1,column:38},source:''},
              id: {
                type: 'Identifier',
                loc:{start:{line:1,column:14},end:{line:1,column:15},source:''},
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                loc:{start:{line:1,column:16},end:{line:1,column:38},source:''},
                body: [
                  {
                    type: 'MethodDefinition',
                    loc:{start:{line:1,column:17},end:{line:1,column:28},source:''},
                    key: {
                      type: 'Identifier',
                      loc:{start:{line:1,column:18},end:{line:1,column:23},source:''},
                      name: 'await'
                    },
                    static: false,
                    computed: true,
                    kind: 'method',
                    value: {
                      type: 'FunctionExpression',
                      loc:{start:{line:1,column:17},end:{line:1,column:28},source:''},
                      generator: false,
                      async: false,
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        loc:{start:{line:1,column:26},end:{line:1,column:28},source:''},
                        body: []
                      }
                    }
                  },
                  {
                    type: 'MethodDefinition',
                    loc:{start:{line:1,column:30},end:{line:1,column:37},source:''},
                    key: {
                      type: 'Literal',
                      loc:{start:{line:1,column:30},end:{line:1,column:33},source:''},
                      value: 'x',
                      raw: '"x"'
                    },
                    static: false,
                    computed: false,
                    kind: 'method',
                    value: {
                      type: 'FunctionExpression',
                      loc:{start:{line:1,column:30},end:{line:1,column:37},source:''},
                      generator: false,
                      async: false,
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        loc:{start:{line:1,column:35},end:{line:1,column:37},source:''},
                        body: []
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:43},end:{line:1,column:45},source:''},
          body: []
        }
      }
    }
  ]
}

tokens (26x):
       PUNC_PAREN_OPEN IDENT PUNC_EQ ID_class IDENT PUNC_CURLY_OPEN
       PUNC_BRACKET_OPEN ID_await PUNC_BRACKET_CLOSE PUNC_PAREN_OPEN
       PUNC_PAREN_CLOSE PUNC_CURLY_OPEN PUNC_CURLY_CLOSE PUNC_SEMI
       STRING_DOUBLE PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE PUNC_PAREN_CLOSE PUNC_EQ_GT
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:0, error@1:23
╔══╦═════════════════
 1 ║ (fail = class A {[await](){}; "x"(){}}) => {}
   ║                        ^------- error
╚══╩═════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
(fail = class A{[await](){};
"x"(){};}) => {};
````

Produces same AST