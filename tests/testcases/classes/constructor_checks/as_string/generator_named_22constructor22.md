# Tenko parser test case

- Path: tests/testcases/classes/constructor_checks/as_string/generator_named_22constructor22.md

> :: classes : constructor checks : as string
>
> ::> generator named 22constructor22
>
> it is a syntax error for non-static constructor to have a modifier (get/set/async/generator)

## Input

`````js
class x { *"constructor"(){} }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Class constructors can not be generators

start@1:0, error@1:1
╔══╦════════════════
 1 ║ class x { *"constructor"(){} }
   ║  ^^^^^^^^^^^^^^^^^^^^^^^------- error
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
