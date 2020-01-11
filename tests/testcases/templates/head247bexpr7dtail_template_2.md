# Tenko parser test case

- Path: tests/testcases/templates/head247bexpr7dtail_template_2.md

> :: templates
>
> ::> head247bexpr7dtail template 2

## Input

`````js
`foo${`foo`}baz`
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
  loc:{start:{line:1,column:0},end:{line:1,column:16},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:16},source:''},
      expression: {
        type: 'TemplateLiteral',
        loc:{start:{line:1,column:0},end:{line:1,column:16},source:''},
        expressions: [
          {
            type: 'TemplateLiteral',
            loc:{start:{line:1,column:6},end:{line:1,column:11},source:''},
            expressions: [],
            quasis: [
              {
                type: 'TemplateElement',
                loc:{start:{line:1,column:7},end:{line:1,column:10},source:''},
                tail: true,
                value: { raw: 'foo', cooked: 'foo' }
              }
            ]
          }
        ],
        quasis: [
          {
            type: 'TemplateElement',
            loc:{start:{line:1,column:1},end:{line:1,column:4},source:''},
            tail: false,
            value: { raw: 'foo', cooked: 'foo' }
          },
          {
            type: 'TemplateElement',
            loc:{start:{line:1,column:12},end:{line:1,column:15},source:''},
            tail: true,
            value: { raw: 'baz', cooked: 'baz' }
          }
        ]
      }
    }
  ]
}

tokens (5x):
       TICK_HEAD TICK_PURE TICK_TAIL ASI
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
`foo${`foo`}baz`;
````

Produces same AST