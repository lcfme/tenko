# Tenko parser test case

- Path: tests/testcases/regexes/some_annexb_stuff/non-existing_backreference_becomes_decimal_escape/with_web_compat_without_u-flag.md

> :: regexes : some annexb stuff : non-existing backreference becomes decimal escape
>
> ::> with web compat without u-flag

## Input

`````js
/foo \2 bar/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Largest back reference index exceeded the number of capturing groups (only valid without u-flag in webcompat mode)

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /foo \2 bar/
   ║ ^^^^^^^^^^^^------- error
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
  loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
        value: null,
        regex: { pattern: 'foo \\2 bar', flags: '' },
        raw: '/foo \\2 bar/'
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
/foo \2 bar/;
````

Produces same AST
