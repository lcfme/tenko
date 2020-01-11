# Tenko parser test case

- Path: tests/testcases/const/binding/for-header/regular_vars/regular_for-loop/const_var_with_init_semi.md

> :: const : binding : for-header : regular vars : regular for-loop
>
> ::> const var with init semi

## Input

`````js
for (const foo = bar;;);
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
  loc:{start:{line:1,column:0},end:{line:1,column:24},source:''},
  body: [
    {
      type: 'ForStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:24},source:''},
      init: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:20},source:''},
        kind: 'const',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:11},end:{line:1,column:20},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:1,column:11},end:{line:1,column:14},source:''},
              name: 'foo'
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:17},end:{line:1,column:20},source:''},
              name: 'bar'
            }
          }
        ]
      },
      test: null,
      update: null,
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:23},end:{line:1,column:24},source:''}
      }
    }
  ]
}

tokens (11x):
       ID_for PUNC_PAREN_OPEN ID_const IDENT PUNC_EQ IDENT PUNC_SEMI
       PUNC_SEMI PUNC_PAREN_CLOSE PUNC_SEMI
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
for (const foo = bar;;) ;
````

Produces same AST