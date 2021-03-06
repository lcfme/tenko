# Tenko parser test case

- Path: tests/testcases/strict_mode/with_directive/in_global/not_first.md

> :: strict mode : with directive : in global
>
> ::> not first

## Input

`````js
var x; "use strict"; with (x) y;
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
  loc:{start:{line:1,column:0},end:{line:1,column:32},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:6},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
            name: 'x'
          },
          init: null
        }
      ]
    },
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:7},end:{line:1,column:20},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:7},end:{line:1,column:19},source:''},
        value: 'use strict',
        raw: '"use strict"'
      }
    },
    {
      type: 'WithStatement',
      loc:{start:{line:1,column:21},end:{line:1,column:32},source:''},
      object: {
        type: 'Identifier',
        loc:{start:{line:1,column:27},end:{line:1,column:28},source:''},
        name: 'x'
      },
      body: {
        type: 'ExpressionStatement',
        loc:{start:{line:1,column:30},end:{line:1,column:32},source:''},
        expression: {
          type: 'Identifier',
          loc:{start:{line:1,column:30},end:{line:1,column:31},source:''},
          name: 'y'
        }
      }
    }
  ]
}

tokens (12x):
       ID_var IDENT PUNC_SEMI STRING_DOUBLE PUNC_SEMI ID_with
       PUNC_PAREN_OPEN IDENT PUNC_PAREN_CLOSE IDENT PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  The `with` statement is not allowed in strict mode

start@1:0, error@1:21
╔══╦═════════════════
 1 ║ var x; "use strict"; with (x) y;
   ║                      ^^^^------- error
╚══╩═════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
var x;
("use strict");
with (x) y;
````

Produces same AST
