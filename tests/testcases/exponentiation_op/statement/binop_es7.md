# Tenko parser test case

- Path: tests/testcases/exponentiation_op/statement/binop_es7.md

> :: exponentiation op : statement
>
> ::> binop es7
## PASS

## Input

- `es = 7`

`````js
2 ** 4
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
  loc:{start:{line:1,column:0},end:{line:1,column:6},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:6},source:''},
      expression: {
        type: 'BinaryExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:6},source:''},
        left: {
          type: 'Literal',
          loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
          value: 2,
          raw: '2'
        },
        operator: '**',
        right: {
          type: 'Literal',
          loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
          value: 4,
          raw: '4'
        }
      }
    }
  ]
}

tokens (5x):
       NUMBER_DEC PUNC_STAR_STAR NUMBER_DEC ASI
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
2 ** 4;
````

Produces same AST
