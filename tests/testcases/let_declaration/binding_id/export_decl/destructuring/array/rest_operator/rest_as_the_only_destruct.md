# Tenko parser test case

- Path: tests/testcases/let_declaration/binding_id/export_decl/destructuring/array/rest_operator/rest_as_the_only_destruct.md

> :: let declaration : binding id : export decl : destructuring : array : rest operator
>
> ::> rest as the only destruct

## Input

`````js
export let [...foo] = obj;
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
 1 ║ export let [...foo] = obj;
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
  loc:{start:{line:1,column:0},end:{line:1,column:26},source:''},
  body: [
    {
      type: 'ExportNamedDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:26},source:''},
      specifiers: [],
      declaration: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:7},end:{line:1,column:26},source:''},
        kind: 'let',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:11},end:{line:1,column:25},source:''},
            id: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:11},end:{line:1,column:19},source:''},
              elements: [
                {
                  type: 'RestElement',
                  loc:{start:{line:1,column:12},end:{line:1,column:18},source:''},
                  argument: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:15},end:{line:1,column:18},source:''},
                    name: 'foo'
                  }
                }
              ]
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:22},end:{line:1,column:25},source:''},
              name: 'obj'
            }
          }
        ]
      },
      source: null
    }
  ]
}

tokens (10x):
       ID_export ID_let PUNC_BRACKET_OPEN PUNC_DOT_DOT_DOT IDENT
       PUNC_BRACKET_CLOSE PUNC_EQ IDENT PUNC_SEMI
`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._

## AST Printer

Printer output was same as input [module][annexb:no]
