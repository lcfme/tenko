# Tenko parser test case

- Path: tests/testcases/string/escapes/nondirectives/start/octal/zero_nine.md

> :: string : escapes : nondirectives : start : octal
>
> ::> zero nine
>
> An escaped zero is a nul (a zero byte) but can not have another digit following it unless octals are supported
>
> If octals are supported then 8 and 9 do not prevent the nul, otherwise it will trigger a syntax error

## Input

`````js
debugger;
"\08"
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
 2 ║ "\08"
   ║ ^^^^^------- error
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
 2 ║ "\08"
   ║ ^^^^^------- error
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
  loc:{start:{line:1,column:0},end:{line:2,column:5},source:''},
  body: [
    {
      type: 'DebuggerStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''}
    },
    {
      type: 'ExpressionStatement',
      loc:{start:{line:2,column:0},end:{line:2,column:5},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:2,column:0},end:{line:2,column:5},source:''},
        value: '\u00008',
        raw: '"\\08"'
      }
    }
  ]
}

tokens (5x):
       ID_debugger PUNC_SEMI STRING_DOUBLE ASI
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
debugger;
("\08");
````

Produces same AST
