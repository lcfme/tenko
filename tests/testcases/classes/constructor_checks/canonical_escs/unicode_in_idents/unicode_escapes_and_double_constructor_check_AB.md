# Tenko parser test case

- Path: tests/testcases/classes/constructor_checks/canonical_escs/unicode_in_idents/unicode_escapes_and_double_constructor_check_AB.md

> :: classes : constructor checks : canonical escs : unicode in idents
>
> ::> unicode escapes and double constructor check AB

## Input

`````js
class x { \u0063onstructor(){}; constructor(){} }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Classes may only have one constructor

start@1:0, error@1:32
╔══╦═════════════════
 1 ║ class x { \u0063onstructor(){}; constructor(){} }
   ║                                 ^^^^^^^^^^^------- error
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
