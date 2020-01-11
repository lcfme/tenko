# Tenko parser test case

- Path: tests/testcases/const/binding/export/destructuring/array/double_trailing_comma_is_significant.md

> :: const : binding : export : destructuring : array
>
> ::> double trailing comma is significant

## Input

`````js
export const [foo,,] = arr;
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The `export` keyword can only be used with the module goal

start@1:0, error@1:0
╔══╦════════════════
 1 ║ export const [foo,,] = arr;
   ║ ^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:27},source:''},
  body: [
    {
      type: 'ExportNamedDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:27},source:''},
      specifiers: [],
      declaration: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:7},end:{line:1,column:27},source:''},
        kind: 'const',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:13},end:{line:1,column:26},source:''},
            id: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:13},end:{line:1,column:20},source:''},
              elements: [
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:14},end:{line:1,column:17},source:''},
                  name: 'foo'
                },
                null
              ]
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:23},end:{line:1,column:26},source:''},
              name: 'arr'
            }
          }
        ]
      },
      source: null
    }
  ]
}

tokens (11x):
       ID_export ID_const PUNC_BRACKET_OPEN IDENT PUNC_COMMA
       PUNC_COMMA PUNC_BRACKET_CLOSE PUNC_EQ IDENT PUNC_SEMI
`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._

## AST Printer

Printer output different from input [module][annexb:no]:

````js
export const [foo, ,] = arr;
````

Produces same AST