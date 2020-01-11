# Tenko parser test case

- Path: tests/testcases/unicode/unicode_escape_canon_checks/start_of_ident/quad_number_with_3_digits_28auto-fails_under_node3c1029.md

> :: unicode : unicode escape canon checks : start of ident
>
> ::> quad number with 3 digits 28auto-fails under node3c1029
>
> https://codepoints.net/U+0B6E (decimal number)

## Input

`````js
\u0B6EPASS
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Identifier escape did not yield a valid identifier character

start@1:0, error@1:0
╔══╦════════════════
 1 ║ \u0B6EPASS
   ║ ^^^^^^------- error
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

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._