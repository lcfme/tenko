# Tenko parser test case

- Path: tests/testcases/var/binding_generic/as_a_statement/destructuring/object/double_destruct_without_and_with_rename.md

> :: var : binding generic : as a statement : destructuring : object
>
> ::> double destruct without and with rename

## Input

`````js
var {x, y : z} = obj;
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
  loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:20},source:''},
          id: {
            type: 'ObjectPattern',
            loc:{start:{line:1,column:4},end:{line:1,column:14},source:''},
            properties: [
              {
                type: 'Property',
                loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
                  name: 'x'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
                  name: 'x'
                },
                shorthand: true
              },
              {
                type: 'Property',
                loc:{start:{line:1,column:8},end:{line:1,column:13},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:8},end:{line:1,column:9},source:''},
                  name: 'y'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                  name: 'z'
                },
                shorthand: false
              }
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:17},end:{line:1,column:20},source:''},
            name: 'obj'
          }
        }
      ]
    }
  ]
}

tokens (12x):
       ID_var PUNC_CURLY_OPEN IDENT PUNC_COMMA IDENT PUNC_COLON IDENT
       PUNC_CURLY_CLOSE PUNC_EQ IDENT PUNC_SEMI
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
var {x, y:z} = obj;
````

Produces same AST
