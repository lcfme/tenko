# Tenko parser test case

- Path: tests/testcases/new/new2etarget/scoping/in_a_nested_arrow_in_a_function.md

> :: new : new2etarget : scoping
>
> ::> in a nested arrow in a function
>
> refers to the surrounding function (okay, sure)

## Input

`````js
function f(){ _ => _ => new.target }
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
  loc:{start:{line:1,column:0},end:{line:1,column:36},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:36},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
        name: 'f'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:12},end:{line:1,column:36},source:''},
        body: [
          {
            type: 'ExpressionStatement',
            loc:{start:{line:1,column:14},end:{line:1,column:34},source:''},
            expression: {
              type: 'ArrowFunctionExpression',
              loc:{start:{line:1,column:14},end:{line:1,column:34},source:''},
              params: [
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:14},end:{line:1,column:15},source:''},
                  name: '_'
                }
              ],
              id: null,
              generator: false,
              async: false,
              expression: true,
              body: {
                type: 'ArrowFunctionExpression',
                loc:{start:{line:1,column:19},end:{line:1,column:34},source:''},
                params: [
                  {
                    type: 'Identifier',
                    loc:{start:{line:1,column:19},end:{line:1,column:20},source:''},
                    name: '_'
                  }
                ],
                id: null,
                generator: false,
                async: false,
                expression: true,
                body: {
                  type: 'MetaProperty',
                  loc:{start:{line:1,column:24},end:{line:1,column:34},source:''},
                  meta: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:24},end:{line:1,column:27},source:''},
                    name: 'new'
                  },
                  property: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:28},end:{line:1,column:34},source:''},
                    name: 'target'
                  }
                }
              }
            }
          }
        ]
      }
    }
  ]
}

tokens (15x):
       ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN IDENT PUNC_EQ_GT IDENT PUNC_EQ_GT ID_new
       PUNC_DOT ID_target ASI PUNC_CURLY_CLOSE
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
function f() {_ => (_ => (new.target));}
````

Produces same AST
