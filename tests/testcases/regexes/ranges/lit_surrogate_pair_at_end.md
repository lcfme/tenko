# Tenko parser test case

- Path: tests/testcases/regexes/ranges/lit_surrogate_pair_at_end.md

> :: regexes : ranges
>
> ::> lit surrogate pair at end
>
> This is a literal (not-escaped) surrogate pair at the end of a range. This catches a very specific edge case.

## PASS

## Input

`````js
/[a-@{xd83d}@@{xfffd}@]/u
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
        value: null,
        regex: { pattern: '[a-@{xd83d}@@{xfffd}@]', flags: 'u' },
        raw: '/[a-@{xd83d}@@{xfffd}@]/u'
      }
    }
  ]
}

tokens (3x):
       REGEXU ASI
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

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
/[a-@{xd83d}@@{xfffd}@]/u;
````

Produces same AST