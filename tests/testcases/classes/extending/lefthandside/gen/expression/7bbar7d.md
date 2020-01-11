# Tenko parser autogenerated test case

- From: tests/testcases/classes/extending/lefthandside/autogen.md
- Path: tests/testcases/classes/extending/lefthandside/gen/expression/7bbar7d.md

> :: classes : extending : lefthandside : gen : expression
>
> ::> 7bbar7d

## Input


`````js
(class B extends {bar} {})
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
  loc:{start:{line:1,column:0},end:{line:1,column:26},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:26},source:''},
      expression: {
        type: 'ClassExpression',
        loc:{start:{line:1,column:1},end:{line:1,column:25},source:''},
        id: {
          type: 'Identifier',
          loc:{start:{line:1,column:7},end:{line:1,column:8},source:''},
          name: 'B'
        },
        superClass: {
          type: 'ObjectExpression',
          loc:{start:{line:1,column:17},end:{line:1,column:22},source:''},
          properties: [
            {
              type: 'Property',
              loc:{start:{line:1,column:18},end:{line:1,column:21},source:''},
              key: {
                type: 'Identifier',
                loc:{start:{line:1,column:18},end:{line:1,column:21},source:''},
                name: 'bar'
              },
              kind: 'init',
              method: false,
              computed: false,
              value: {
                type: 'Identifier',
                loc:{start:{line:1,column:18},end:{line:1,column:21},source:''},
                name: 'bar'
              },
              shorthand: true
            }
          ]
        },
        body: {
          type: 'ClassBody',
          loc:{start:{line:1,column:23},end:{line:1,column:25},source:''},
          body: []
        }
      }
    }
  ]
}

tokens (12x):
       PUNC_PAREN_OPEN ID_class IDENT ID_extends PUNC_CURLY_OPEN IDENT
       PUNC_CURLY_CLOSE PUNC_CURLY_OPEN PUNC_CURLY_CLOSE
       PUNC_PAREN_CLOSE ASI
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
(class B extends ({bar}) {});
````

Produces same AST