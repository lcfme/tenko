# Tenko parser test case

- Path: tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/static_getter.md

> :: objects : duplicate keys : obj expr : dunderproto proto
>
> ::> static getter
> 
> https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
> 
> > It is a Syntax Error if PropertyNameList of PropertyDefinitionList contains any duplicate entries for "__proto__" and at least two of those entries were obtained from productions of the form PropertyDefinition:PropertyName:AssignmentExpression .
> 
> Rule does not apply to methods

## PASS

## Input

`````js
class x {static __proto__(){}; get __proto__(){}}
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
  loc:{start:{line:1,column:0},end:{line:1,column:49},source:''},
  body: [
    {
      type: 'ClassDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:49},source:''},
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:6},end:{line:1,column:7},source:''},
        name: 'x'
      },
      superClass: null,
      body: {
        type: 'ClassBody',
        loc:{start:{line:1,column:8},end:{line:1,column:49},source:''},
        body: [
          {
            type: 'MethodDefinition',
            loc:{start:{line:1,column:9},end:{line:1,column:29},source:''},
            key: {
              type: 'Identifier',
              loc:{start:{line:1,column:16},end:{line:1,column:25},source:''},
              name: '__proto__'
            },
            static: true,
            computed: false,
            kind: 'method',
            value: {
              type: 'FunctionExpression',
              loc:{start:{line:1,column:9},end:{line:1,column:29},source:''},
              generator: false,
              async: false,
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:27},end:{line:1,column:29},source:''},
                body: []
              }
            }
          },
          {
            type: 'MethodDefinition',
            loc:{start:{line:1,column:31},end:{line:1,column:48},source:''},
            key: {
              type: 'Identifier',
              loc:{start:{line:1,column:35},end:{line:1,column:44},source:''},
              name: '__proto__'
            },
            static: false,
            computed: false,
            kind: 'get',
            value: {
              type: 'FunctionExpression',
              loc:{start:{line:1,column:31},end:{line:1,column:48},source:''},
              generator: false,
              async: false,
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:46},end:{line:1,column:48},source:''},
                body: []
              }
            }
          }
        ]
      }
    }
  ]
}

tokens (18x):
       ID_class IDENT PUNC_CURLY_OPEN ID_static IDENT PUNC_PAREN_OPEN
       PUNC_PAREN_CLOSE PUNC_CURLY_OPEN PUNC_CURLY_CLOSE PUNC_SEMI
       ID_get IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
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
class x{static __proto__(){};
get __proto__(){};}
````

Produces same AST
