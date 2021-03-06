# Tenko parser test case

- Path: tests/testcases/objects/ellipsis/can_be_array.md

> :: objects : ellipsis
>
> ::> can be array

## Input

`````js
x = {...[a, b]}
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
  loc:{start:{line:1,column:0},end:{line:1,column:15},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:15},source:''},
      expression: {
        type: 'AssignmentExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:15},source:''},
        left: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
          name: 'x'
        },
        operator: '=',
        right: {
          type: 'ObjectExpression',
          loc:{start:{line:1,column:4},end:{line:1,column:15},source:''},
          properties: [
            {
              type: 'SpreadElement',
              loc:{start:{line:1,column:5},end:{line:1,column:14},source:''},
              argument: {
                type: 'ArrayExpression',
                loc:{start:{line:1,column:8},end:{line:1,column:14},source:''},
                elements: [
                  {
                    type: 'Identifier',
                    loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
                    name: 'a'
                  },
                  {
                    type: 'Identifier',
                    loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                    name: 'b'
                  }
                ]
              }
            }
          ]
        }
      }
    }
  ]
}

tokens (12x):
       IDENT PUNC_EQ PUNC_CURLY_OPEN PUNC_DOT_DOT_DOT
       PUNC_BRACKET_OPEN IDENT PUNC_COMMA IDENT PUNC_BRACKET_CLOSE
       PUNC_CURLY_CLOSE ASI
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

Printer output different from input [sloppy][annexb:no]:

````js
x = {...[a, b]};
````

Produces same AST
