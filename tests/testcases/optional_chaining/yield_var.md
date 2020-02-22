# Tenko parser test case

- Path: tests/testcases/optional_chaining/yield_var.md

> :: optional chaining
>
> ::> yield var
>
> Stupid edge case
>
> Can pass when in non-strict because the restriction is only for `yield` expression

## Input

`````js
(x = a?.(yield)) => y
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
  loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
        params: [
          {
            type: 'AssignmentPattern',
            loc:{start:{line:1,column:1},end:{line:1,column:15},source:''},
            left: {
              type: 'Identifier',
              loc:{start:{line:1,column:1},end:{line:1,column:2},source:''},
              name: 'x'
            },
            right: {
              type: 'OptionalCallExpression',
              loc:{start:{line:1,column:5},end:{line:1,column:15},source:''},
              optional: true,
              callee: {
                type: 'Identifier',
                loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
                name: 'a'
              },
              arguments: {
                type: 'Identifier',
                loc:{start:{line:1,column:9},end:{line:1,column:14},source:''},
                name: 'yield'
              }
            }
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: true,
        body: {
          type: 'Identifier',
          loc:{start:{line:1,column:20},end:{line:1,column:21},source:''},
          name: 'y'
        }
      }
    }
  ]
}

tokens (13x):
       PUNC_PAREN_OPEN IDENT PUNC_EQ IDENT QMARK_DOT PUNC_PAREN_OPEN
       ID_yield PUNC_PAREN_CLOSE PUNC_PAREN_CLOSE PUNC_EQ_GT IDENT ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode

start@1:0, error@1:9
╔══╦════════════════
 1 ║ (x = a?.(yield)) => y
   ║          ^^^^^------- error
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
(x = a?.(yield)) => (y);
````

Produces same AST