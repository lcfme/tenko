# Tenko parser test case

- Path: tests/testcases/dowhile_statement/asi_is_weird/do_arrow_while.md

> :: dowhile statement : asi is weird
>
> ::> do arrow while
>
> An ASI does not happen between arrow and while when there is no newline, but it is required so this is an error

## FAIL

## Input

`````js
do ()=>x while(c)
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Unable to ASI

start@1:0, error@1:9
╔══╦════════════════
 1 ║ do ()=>x while(c)
   ║          ^^^^^------- error
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
