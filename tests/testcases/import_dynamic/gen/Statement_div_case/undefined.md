# Tenko parser autogenerated test case

- From: tests/testcases/import_dynamic/autogen.md
- Path: tests/testcases/import_dynamic/gen/Statement_div_case/undefined.md

> :: import dynamic : gen : Statement div case
>
> ::> undefined

## Input

- `es = undefined`

`````js
import(/foo/) / bar
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
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:19},source:''},
      expression: {
        type: 'BinaryExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:19},source:''},
        left: {
          type: 'CallExpression',
          loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
          callee: {
            type: 'Import',
            loc:{start:{line:1,column:0},end:{line:1,column:6},source:''}
          },
          arguments: [
            {
              type: 'Literal',
              loc:{start:{line:1,column:7},end:{line:1,column:12},source:''},
              value: null,
              regex: { pattern: 'foo', flags: '' },
              raw: '/foo/'
            }
          ]
        },
        operator: '/',
        right: {
          type: 'Identifier',
          loc:{start:{line:1,column:16},end:{line:1,column:19},source:''},
          name: 'bar'
        }
      }
    }
  ]
}

tokens (8x):
       ID_import PUNC_PAREN_OPEN REGEXN PUNC_PAREN_CLOSE PUNC_DIV
       IDENT ASI
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
import(/foo/) / bar;
````

Produces same AST
