# Tenko parser autogenerated test case

- From: tests/testcases/regexes/regular_expression_disambiguation/keyword_asi_div/autogen.md
- Path: tests/testcases/regexes/regular_expression_disambiguation/keyword_asi_div/keyword_asi_div/private.md

> :: regexes : regular expression disambiguation : keyword asi div : keyword asi div
>
> ::> private

## Input

`````js
private
/x
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
  loc:{start:{line:1,column:0},end:{line:2,column:2},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:2,column:2},source:''},
      expression: {
        type: 'BinaryExpression',
        loc:{start:{line:1,column:0},end:{line:2,column:2},source:''},
        left: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:7},source:''},
          name: 'private'
        },
        operator: '/',
        right: {
          type: 'Identifier',
          loc:{start:{line:2,column:1},end:{line:2,column:2},source:''},
          name: 'x'
        }
      }
    }
  ]
}

tokens (5x):
       ID_private PUNC_DIV IDENT ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`private`) as a variable name because: Cannot use this reserved word as a variable name in strict mode

start@1:0, error@1:0
╔══╦════════════════
 1 ║ private
   ║ ^^^^^^^------- error
 2 ║ /x
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

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
private / x;
````

Produces same AST
