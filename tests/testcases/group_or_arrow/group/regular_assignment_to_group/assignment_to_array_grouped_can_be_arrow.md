# Tenko parser test case

- Path: tests/testcases/group_or_arrow/group/regular_assignment_to_group/assignment_to_array_grouped_can_be_arrow.md

> :: group or arrow : group : regular assignment to group
>
> ::> assignment to array grouped can be arrow
>
> the group is fine otherwise

## Input

`````js
([x, y] = z) => x;
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
  loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        params: [
          {
            type: 'AssignmentPattern',
            loc:{start:{line:1,column:1},end:{line:1,column:11},source:''},
            left: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:1},end:{line:1,column:7},source:''},
              elements: [
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:2},end:{line:1,column:3},source:''},
                  name: 'x'
                },
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:5},end:{line:1,column:6},source:''},
                  name: 'y'
                }
              ]
            },
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:10},end:{line:1,column:11},source:''},
              name: 'z'
            }
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: true,
        body: {
          type: 'Identifier',
          loc:{start:{line:1,column:16},end:{line:1,column:17},source:''},
          name: 'x'
        }
      }
    }
  ]
}

tokens (13x):
       PUNC_PAREN_OPEN PUNC_BRACKET_OPEN IDENT PUNC_COMMA IDENT
       PUNC_BRACKET_CLOSE PUNC_EQ IDENT PUNC_PAREN_CLOSE PUNC_EQ_GT
       IDENT PUNC_SEMI
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
([x, y] = z) => (x);
````

Produces same AST
