# Tenko parser test case

- Path: tests/testcases/let_declaration/binding_id/export_decl/regular_vars/var_on_next_line_does_not_trigger_asi.md

> :: let declaration : binding id : export decl : regular vars
>
> ::> var on next line does not trigger asi

## Input

`````js
export let
foo
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
 1 ║ export let
   ║ ^^^^^^------- error
 2 ║ foo
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
  loc:{start:{line:1,column:0},end:{line:2,column:3},source:''},
  body: [
    {
      type: 'ExportNamedDeclaration',
      loc:{start:{line:1,column:0},end:{line:2,column:3},source:''},
      specifiers: [],
      declaration: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:7},end:{line:2,column:3},source:''},
        kind: 'let',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:2,column:0},end:{line:2,column:3},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:2,column:0},end:{line:2,column:3},source:''},
              name: 'foo'
            },
            init: null
          }
        ]
      },
      source: null
    }
  ]
}

tokens (5x):
       ID_export ID_let IDENT ASI
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
export let foo;
````

Produces same AST
