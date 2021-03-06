# Tenko parser test case

- Path: tests/testcases/var/binding_generic/as_a_statement/destructuring/array/non-destruct_with_init_and_destruct.md

> :: var : binding generic : as a statement : destructuring : array
>
> ::> non-destruct with init and destruct

## Input

`````js
var foo = arr, [bar] = arr2;
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
  loc:{start:{line:1,column:0},end:{line:1,column:28},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:28},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:13},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
            name: 'foo'
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:10},end:{line:1,column:13},source:''},
            name: 'arr'
          }
        },
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:15},end:{line:1,column:27},source:''},
          id: {
            type: 'ArrayPattern',
            loc:{start:{line:1,column:15},end:{line:1,column:20},source:''},
            elements: [
              {
                type: 'Identifier',
                loc:{start:{line:1,column:16},end:{line:1,column:19},source:''},
                name: 'bar'
              }
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:23},end:{line:1,column:27},source:''},
            name: 'arr2'
          }
        }
      ]
    }
  ]
}

tokens (12x):
       ID_var IDENT PUNC_EQ IDENT PUNC_COMMA PUNC_BRACKET_OPEN IDENT
       PUNC_BRACKET_CLOSE PUNC_EQ IDENT PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._

## AST Printer

Printer output was same as input [sloppy][annexb:no]
