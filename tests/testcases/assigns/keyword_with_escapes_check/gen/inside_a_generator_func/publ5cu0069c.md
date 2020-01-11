# Tenko parser autogenerated test case

- From: tests/testcases/assigns/keyword_with_escapes_check/autogen.md
- Path: tests/testcases/assigns/keyword_with_escapes_check/gen/inside_a_generator_func/publ5cu0069c.md

> :: assigns : keyword with escapes check : gen : inside a generator func
>
> ::> publ5cu0069c

## Input


`````js
function *f(){
  publ\u0069c = x
}
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
  loc:{start:{line:1,column:0},end:{line:3,column:1},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:3,column:1},source:''},
      generator: true,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:10},end:{line:1,column:11},source:''},
        name: 'f'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:13},end:{line:3,column:1},source:''},
        body: [
          {
            type: 'ExpressionStatement',
            loc:{start:{line:2,column:2},end:{line:2,column:17},source:''},
            expression: {
              type: 'AssignmentExpression',
              loc:{start:{line:2,column:2},end:{line:2,column:17},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:2,column:2},end:{line:2,column:13},source:''},
                name: 'public'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                loc:{start:{line:2,column:16},end:{line:2,column:17},source:''},
                name: 'x'
              }
            }
          }
        ]
      }
    }
  ]
}

tokens (12x):
       ID_function PUNC_STAR IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN IDENT PUNC_EQ IDENT ASI PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`publ\u0069c`) as a variable name because: Keywords may not have escapes in their name and this resolves to `public`

start@1:0, error@2:2
╔══╦════════════════
 1 ║ function *f(){
 2 ║   publ\u0069c = x
   ║   ^^^^^^^^^^^------- error
 3 ║ }
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
function* f() {public = x;}
````

Produces same AST