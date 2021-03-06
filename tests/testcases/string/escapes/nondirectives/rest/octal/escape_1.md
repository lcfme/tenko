# Tenko parser test case

- Path: tests/testcases/string/escapes/nondirectives/rest/octal/escape_1.md

> :: string : escapes : nondirectives : rest : octal
>
> ::> escape 1
>
> Only zero is special to escape

## Input

`````js
debugger;
'a \1 b';
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Octal escapes are only allowed in sloppy mode with web compat enabled

start@1:0, error@2:0
╔══╦════════════════
 1 ║ debugger;
 2 ║ 'a \1 b';
   ║ ^^^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Lexer error!
    Illegal legacy octal escape in strict mode

start@1:0, error@2:0
╔══╦════════════════
 1 ║ debugger;
 2 ║ 'a \1 b';
   ║ ^^^^^^^^------- error
╚══╩════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:2,column:9},source:''},
  body: [
    {
      type: 'DebuggerStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''}
    },
    {
      type: 'ExpressionStatement',
      loc:{start:{line:2,column:0},end:{line:2,column:9},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:2,column:0},end:{line:2,column:8},source:''},
        value: 'a \u0001 b',
        raw: "'a \\1 b'"
      }
    }
  ]
}

tokens (5x):
       ID_debugger PUNC_SEMI STRING_SINGLE PUNC_SEMI
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
debugger;
('a \1 b');
````

Produces same AST
