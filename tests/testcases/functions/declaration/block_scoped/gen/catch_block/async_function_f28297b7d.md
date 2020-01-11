# Tenko parser autogenerated test case

- From: tests/testcases/functions/declaration/block_scoped/autogen.md
- Path: tests/testcases/functions/declaration/block_scoped/gen/catch_block/async_function_f28297b7d.md

> :: functions : declaration : block scoped : gen : catch block
>
> ::> async function f28297b7d

## Input


`````js
try { } catch (e) { async function f(){} async function f(){} }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Attempted to create a lexical binding for `f` but another binding already existed on the same level

start@1:0, error@1:56
╔══╦═════════════════
 1 ║ try { } catch (e) { async function f(){} async function f(){} }
   ║                                                         ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:63},source:''},
  body: [
    {
      type: 'TryStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:63},source:''},
      block: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
        body: []
      },
      handler: {
        type: 'CatchClause',
        loc:{start:{line:1,column:8},end:{line:1,column:63},source:''},
        param: {
          type: 'Identifier',
          loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
          name: 'e'
        },
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:18},end:{line:1,column:63},source:''},
          body: [
            {
              type: 'FunctionDeclaration',
              loc:{start:{line:1,column:20},end:{line:1,column:40},source:''},
              generator: false,
              async: true,
              id: {
                type: 'Identifier',
                loc:{start:{line:1,column:35},end:{line:1,column:36},source:''},
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:38},end:{line:1,column:40},source:''},
                body: []
              }
            },
            {
              type: 'FunctionDeclaration',
              loc:{start:{line:1,column:41},end:{line:1,column:61},source:''},
              generator: false,
              async: true,
              id: {
                type: 'Identifier',
                loc:{start:{line:1,column:56},end:{line:1,column:57},source:''},
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:59},end:{line:1,column:61},source:''},
                body: []
              }
            }
          ]
        }
      },
      finalizer: null
    }
  ]
}

tokens (24x):
       ID_try PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ID_catch
       PUNC_PAREN_OPEN IDENT PUNC_PAREN_CLOSE PUNC_CURLY_OPEN ID_async
       ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ID_async ID_function IDENT
       PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
try {} catch (e) {async function f() {}
async function f() {}}
````

Produces same AST