# Tenko parser test case

- Path: tests/testcases/var/binding_generic/as_a_statement/destructuring/array/rest_operator/rest_as_the_only_destruct.md

> :: var : binding generic : as a statement : destructuring : array : rest operator
>
> ::> rest as the only destruct

## Input

`````js
var [...foo] = obj;
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
  loc:{start:{line:1,column:0},end:{line:1,column:19},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:19},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:18},source:''},
          id: {
            type: 'ArrayPattern',
            loc:{start:{line:1,column:4},end:{line:1,column:12},source:''},
            elements: [
              {
                type: 'RestElement',
                loc:{start:{line:1,column:5},end:{line:1,column:11},source:''},
                argument: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:8},end:{line:1,column:11},source:''},
                  name: 'foo'
                }
              }
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:15},end:{line:1,column:18},source:''},
            name: 'obj'
          }
        }
      ]
    }
  ]
}

tokens (9x):
       ID_var PUNC_BRACKET_OPEN PUNC_DOT_DOT_DOT IDENT
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
