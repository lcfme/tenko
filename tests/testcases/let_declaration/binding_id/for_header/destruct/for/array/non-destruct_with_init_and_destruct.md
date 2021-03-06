# Tenko parser test case

- Path: tests/testcases/let_declaration/binding_id/for_header/destruct/for/array/non-destruct_with_init_and_destruct.md

> :: let declaration : binding id : for header : destruct : for : array
>
> ::> non-destruct with init and destruct

## Input

`````js
for (let foo = arr, [bar] = arr2;;);
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
  loc:{start:{line:1,column:0},end:{line:1,column:36},source:''},
  body: [
    {
      type: 'ForStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:36},source:''},
      init: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:32},source:''},
        kind: 'let',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:9},end:{line:1,column:18},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:1,column:9},end:{line:1,column:12},source:''},
              name: 'foo'
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:15},end:{line:1,column:18},source:''},
              name: 'arr'
            }
          },
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:20},end:{line:1,column:32},source:''},
            id: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:20},end:{line:1,column:25},source:''},
              elements: [
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:21},end:{line:1,column:24},source:''},
                  name: 'bar'
                }
              ]
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:28},end:{line:1,column:32},source:''},
              name: 'arr2'
            }
          }
        ]
      },
      test: null,
      update: null,
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:35},end:{line:1,column:36},source:''}
      }
    }
  ]
}

tokens (17x):
       ID_for PUNC_PAREN_OPEN ID_let IDENT PUNC_EQ IDENT PUNC_COMMA
       PUNC_BRACKET_OPEN IDENT PUNC_BRACKET_CLOSE PUNC_EQ IDENT
       PUNC_SEMI PUNC_SEMI PUNC_PAREN_CLOSE PUNC_SEMI
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
for (let foo = arr, [bar] = arr2;;) ;
````

Produces same AST
