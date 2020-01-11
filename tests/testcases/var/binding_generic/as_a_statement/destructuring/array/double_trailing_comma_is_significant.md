# Tenko parser test case

- Path: tests/testcases/var/binding_generic/as_a_statement/destructuring/array/double_trailing_comma_is_significant.md

> :: var : binding generic : as a statement : destructuring : array
>
> ::> double trailing comma is significant

## Input

`````js
var [foo,,] = arr;
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
  loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:17},source:''},
          id: {
            type: 'ArrayPattern',
            loc:{start:{line:1,column:4},end:{line:1,column:11},source:''},
            elements: [
              {
                type: 'Identifier',
                loc:{start:{line:1,column:5},end:{line:1,column:8},source:''},
                name: 'foo'
              },
              null
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:14},end:{line:1,column:17},source:''},
            name: 'arr'
          }
        }
      ]
    }
  ]
}

tokens (10x):
       ID_var PUNC_BRACKET_OPEN IDENT PUNC_COMMA PUNC_COMMA
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

Printer output different from input [sloppy][annexb:no]:

````js
var [foo, ,] = arr;
````

Produces same AST