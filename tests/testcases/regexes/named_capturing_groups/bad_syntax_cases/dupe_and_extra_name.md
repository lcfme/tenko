# Tenko parser test case

- Path: tests/testcases/regexes/named_capturing_groups/bad_syntax_cases/dupe_and_extra_name.md

> :: regexes : named capturing groups : bad syntax cases
>
> ::> dupe and extra name
Fails regardless because the duplicate name does not allow backtracking in webcompat; it's gonna be an error.

## FAIL

## Input


`````js
/(?<a>a)(?<b>b)(?<a>a)/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    This group name (`a`) was already used before

start@1:0, error@1:18
╔══╦═════════════════
 1 ║ /(?<a>a)(?<b>b)(?<a>a)/
   ║                   ^------- error
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
