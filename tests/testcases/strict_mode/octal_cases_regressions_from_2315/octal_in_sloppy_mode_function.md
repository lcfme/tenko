# Tenko parser test case

- Path: tests/testcases/strict_mode/octal_cases_regressions_from_2315/octal_in_sloppy_mode_function.md

> :: strict mode : octal cases regressions from 2315
>
> ::> octal in sloppy mode function

## Input

`````js
function foo() { 00004; }
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
  loc:{start:{line:1,column:0},end:{line:1,column:25},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:25},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:9},end:{line:1,column:12},source:''},
        name: 'foo'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:15},end:{line:1,column:25},source:''},
        body: [
          {
            type: 'ExpressionStatement',
            loc:{start:{line:1,column:17},end:{line:1,column:23},source:''},
            expression: {
              type: 'Literal',
              loc:{start:{line:1,column:17},end:{line:1,column:22},source:''},
              value: 4,
              raw: '00004'
            }
          }
        ]
      }
    }
  ]
}

tokens (9x):
       ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN NUMBER_OLD PUNC_SEMI PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Lexer error!
    "Illegal" octal escape in strict mode

start@1:0, error@1:17
╔══╦═════════════════
 1 ║ function foo() { 00004; }
   ║                  ^^^^^------- error
╚══╩═════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
function foo() {00004;}
````

Produces same AST