# Tenko parser test case

- Path: tests/testcases/lexer_cases/regexesn/charclass_range_tests/bad_u_lhs_same.md

> :: lexer cases : regexesn : charclass range tests
>
> ::> bad u lhs same
>
> Imported lexer test
>
> ranges using various escapes and long unicode escapes
>
> The `\u-` is a bad escape and in sloppy mode adds the codepoint for `u` to the char class. So it's basically `u-u`, which is ok.

## Input

`````js
/[\u-u]/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Attempted to parse a unicode quad escape but at least one digit was not a hex; Encountered unescaped closing square bracket `]` while not parsing a character class, which is only valid without u-flag

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /[\u-u]/
   ║ ^^^^^^^------- error
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

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:8},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:8},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:0},end:{line:1,column:8},source:''},
        value: null,
        regex: { pattern: '[\\u-u]', flags: '' },
        raw: '/[\\u-u]/'
      }
    }
  ]
}

tokens (3x):
       REGEXN ASI
`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._

## AST Printer

Printer output different from input [sloppy][annexb:yes]:

````js
/[\u-u]/;
````

Produces same AST
