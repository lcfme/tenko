# Tenko parser test case

- Path: tests/testcases/bindings/block/annex_b_function_statement_exception/should_not_trigger_syntax_error_if_only_bound_to_function_decl_names.md

> :: bindings : block : annex b function statement exception
>
> ::> should not trigger syntax error if only bound to function decl names

## Input

`````js
{ if (x) function f() {} ; function f() {} }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  A function declaration can only be the child of an `if`/`else` in sloppy web compat mode

start@1:0, error@1:9
╔══╦════════════════
 1 ║ { if (x) function f() {} ; function f() {} }
   ║          ^^^^^^^^------- error
╚══╩════════════════

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
  loc:{start:{line:1,column:0},end:{line:1,column:44},source:''},
  body: [
    {
      type: 'BlockStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:44},source:''},
      body: [
        {
          type: 'IfStatement',
          loc:{start:{line:1,column:2},end:{line:1,column:24},source:''},
          test: {
            type: 'Identifier',
            loc:{start:{line:1,column:6},end:{line:1,column:7},source:''},
            name: 'x'
          },
          consequent: {
            type: 'FunctionDeclaration',
            loc:{start:{line:1,column:9},end:{line:1,column:24},source:''},
            generator: false,
            async: false,
            id: {
              type: 'Identifier',
              loc:{start:{line:1,column:18},end:{line:1,column:19},source:''},
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              loc:{start:{line:1,column:22},end:{line:1,column:24},source:''},
              body: []
            }
          },
          alternate: null
        },
        {
          type: 'EmptyStatement',
          loc:{start:{line:1,column:25},end:{line:1,column:26},source:''}
        },
        {
          type: 'FunctionDeclaration',
          loc:{start:{line:1,column:27},end:{line:1,column:42},source:''},
          generator: false,
          async: false,
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:36},end:{line:1,column:37},source:''},
            name: 'f'
          },
          params: [],
          body: {
            type: 'BlockStatement',
            loc:{start:{line:1,column:40},end:{line:1,column:42},source:''},
            body: []
          }
        }
      ]
    }
  ]
}

tokens (20x):
       PUNC_CURLY_OPEN ID_if PUNC_PAREN_OPEN IDENT PUNC_PAREN_CLOSE
       ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE PUNC_SEMI ID_function IDENT
       PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
{if (x) function f() {}
;
function f() {}}
````

Produces same AST
