# Tenko parser test case

- Path: tests/testcases/bindings/block/annex_b_function_statement_exception/label_async_func_and_var_in_global.md

> :: bindings : block : annex b function statement exception
>
> ::> label async func and var in global
>
>Async functions are never function statements, the grammar simply doesn't have them, so this is always an error.


## Input

`````js
var f = 123;
oops: async function f(){}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  A "labelled function declaration" can not be async

start@1:0, error@2:6
╔══╦════════════════
 1 ║ var f = 123;
 2 ║ oops: async function f(){}
   ║       ^^^^^^^^^^^^^^------- error
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
