# Tenko parser test case

- Path: tests/testcases/templates/bad_escapes/octal_escapes/octal_at_start.md

> :: templates : bad escapes : octal escapes
>
> ::> octal at start
>
> https://tc39.github.io/ecma262/#prod-CodePoint
>
> > "A conforming implementation must not use the extended definition of EscapeSequence described in B.1.2 when parsing a TemplateCharacter."
>
> (these can be extended for string but should always be errors for non-tagged templates)
>
> Must fail! Templates cannot support octal escapes.

## FAIL

## Input

`````js
`\00`
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Template contained bad escape, which is only valid in _tagged_ templates (and only since ES9/ES2018)

start@1:0, error@1:0
╔══╦════════════════
 1 ║ `\00`
   ║ ^^^^^------- error
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
