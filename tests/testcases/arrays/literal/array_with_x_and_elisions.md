# Tenko parser test case

- Path: tests/testcases/arrays/literal/array_with_x_and_elisions.md

> :: arrays : literal
>
> ::> array with x and elisions

## Input

`````js
[x,,,]
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
        type: 'ArrayExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:6},source:''},
        elements: [
          {
            type: 'Identifier',
            loc:{start:{line:1,column:1},end:{line:1,column:2},source:''},
            name: 'x'
          },
          null,
          null
        ]
      }
    }
  ]
}

tokens (8x):
       PUNC_BRACKET_OPEN IDENT PUNC_COMMA PUNC_COMMA PUNC_COMMA
       PUNC_BRACKET_CLOSE ASI
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
[x, , ,];
````

Produces same AST
