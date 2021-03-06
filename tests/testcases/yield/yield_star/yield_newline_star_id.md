# Tenko parser test case

- Path: tests/testcases/yield/yield_star/yield_newline_star_id.md

> :: yield : yield star
>
> ::> yield newline star id
>
> Yield star is a restricted production

## FAIL

## Input

`````js
function *f() {
  yield
  * 1;
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  A newline after `yield` is illegal for `yield *`

start@1:0, error@2:2
╔══╦════════════════
 1 ║ function *f() {
 2 ║   yield
   ║   ^^^^^^^^------- error
 3 ║   * 1;
 4 ║ }
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
