# Tenko parser autogenerated test case

- From: tests/testcases/yield/function_piggy/autogen.md
- Path: tests/testcases/yield/function_piggy/gen/test/function_f287ba3a_b_3d_yield_c7d29_7b7d.md

> :: yield : function piggy : gen : test
>
> ::> function f287ba3a b 3d yield c7d29 7b7d

## Input


`````js
function f({a: b = yield c}) {}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected the closing curly `}` for an object, found `c` instead

start@1:0, error@1:25
╔══╦═════════════════
 1 ║ function f({a: b = yield c}) {}
   ║                          ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode

start@1:0, error@1:19
╔══╦═════════════════
 1 ║ function f({a: b = yield c}) {}
   ║                    ^^^^^------- error
╚══╩═════════════════

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