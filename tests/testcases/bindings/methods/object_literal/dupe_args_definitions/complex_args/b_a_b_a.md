# Tenko parser test case

- Path: tests/testcases/bindings/methods/object_literal/dupe_args_definitions/complex_args/b_a_b_a.md

> :: bindings : methods : object literal : dupe args definitions : complex args
>
> ::> b a b a

## Input

`````js
o = {f([b, a, b, a]) {}}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Method had duplicate params

start@1:0, error@1:17
╔══╦═════════════════
 1 ║ o = {f([b, a, b, a]) {}}
   ║                  ^------- error
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