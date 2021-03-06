# Tenko parser test case

- Path: tests/testcases/regexes/some_annexb_stuff/8_9_escaped/with_web_compat_with_u-flag/escaped_9_too_many_digits.md

> :: regexes : some annexb stuff : 8 9 escaped : with web compat with u-flag
>
> ::> escaped 9 too many digits

## Input


`````js
/\986a/u
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Parsed too many digits

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /\986a/u
   ║ ^^^^^^^------- error
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
throws: Lexer error!
    Regex: Parsed too many digits; Regex contained syntax that is invalid with the u-flag but the u-flag was present

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /\986a/u
   ║ ^^^^^^^^------- error
╚══╩════════════════

`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._
