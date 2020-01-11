# Tenko parser test case

- Path: tests/testcases/let_declaration/binding_id/for_header/destruct/for_bad/array/rest_operator/rest_followed_by_an_ident.md

> :: let declaration : binding id : for header : destruct : for bad : array : rest operator
>
> ::> rest followed by an ident

## Input

`````js
for (let [...foo, bar] = obj);
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The binding pattern is not destructible

start@1:0, error@1:23
╔══╦═════════════════
 1 ║ for (let [...foo, bar] = obj);
   ║                        ^------- error
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