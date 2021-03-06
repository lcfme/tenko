# Tenko parser autogenerated test case

- From: tests/testcases/regexes/u-escape/autogen.md
- Path: tests/testcases/regexes/u-escape/gen/without_u-flag/2f5cu7b2f.md

> :: regexes : u-escape : gen : without u-flag
>
> ::> 2f5cu7b2f

## Input


`````js
/\u{/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Error while trying to parse regex atom unicode escape

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /\u{/
   ║ ^^^^^------- error
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
  loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
        value: null,
        regex: { pattern: '\\u{', flags: '' },
        raw: '/\\u{/'
      }
    }
  ]
}

tokens (3x):
       REGEXN ASI
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
/\u{/;
````

Produces same AST
