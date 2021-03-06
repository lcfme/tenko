# Tenko parser test case

- Path: tests/testcases/for_statement/for-of/regressions_238/lhs_rest_with_trailing_comma.md

> :: for statement : for-of : regressions 238
>
> ::> lhs rest with trailing comma
>
> As reported by https://github.com/pvdz/zeparser3/issues/8

## Input

`````js
for ([...x,] of [[]]);
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The for-header lhs binding pattern is not destructible

start@1:0, error@1:13
╔══╦═════════════════
 1 ║ for ([...x,] of [[]]);
   ║              ^^------- error
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

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._
