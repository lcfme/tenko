# Tenko parser test case

- Path: tests/testcases/random_stuff/protected_double_declraed_according_to_v8_1.md

> :: random stuff
>
> ::> protected double declraed according to v8 1

## Input


`````js
function package(){}let package=a,function v(){}const v=x
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Attempted to create a lexical binding for `package` but another binding already existed on the same level

start@1:0, error@1:24
╔══╦═════════════════
 1 ║ function package(){}let package=a,function v(){}const v=x
   ║                         ^^^^^^^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`package`) as a variable name because: Cannot use this reserved word as a variable name in strict mode

start@1:0, error@1:9
╔══╦════════════════
 1 ║ function package(){}let package=a,function v(){}const v=x
   ║          ^^^^^^^------- error
╚══╩════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._
