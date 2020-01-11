# Tenko parser test case

- Path: tests/testcases/assigns/keyword_with_escapes_check/leading_escape_5bdefault_3d3e_5cu0064efault5d.md

> :: assigns : keyword with escapes check
>
> ::> leading escape 5bdefault 3d3e 5cu0064efault5d

## Input

`````js
(\u0064efault = "sentinal 1564646")
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Cannot use this name (`\u0064efault`) as a variable name because: Keywords may not have escapes in their name and this resolves to `default`

start@1:0, error@1:1
╔══╦════════════════
 1 ║ (\u0064efault = "sentinal 1564646")
   ║  ^^^^^^^^^^^^------- error
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