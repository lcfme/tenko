# Tenko parser test case

- Path: tests/testcases/parens/arrow/spread/can_not_spread_member.md

> :: parens : arrow : spread
>
> ::> can not spread member
>
> would be valid in group; `[...x.y];`

## Input


`````js
([...x.y]) => z
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The left hand side of the arrow can only be destructed through assignment so arrow is illegal

start@1:0, error@1:11
╔══╦═════════════════
 1 ║ ([...x.y]) => z
   ║            ^^------- error
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
