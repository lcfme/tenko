# Tenko parser test case

- Path: tests/testcases/export_declaration/confirm_when_a_semi_is_not_needed/default/async_anon_func.md

> :: export declaration : confirm when a semi is not needed : default
>
> ::> async anon func

## Input

`````js
export default async function(){} foo
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The `export` keyword can only be used with the module goal

start@1:0, error@1:0
╔══╦════════════════
 1 ║ export default async function(){} foo
   ║ ^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:37},source:''},
  body: [
    {
      type: 'ExportDefaultDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:33},source:''},
      declaration: {
        type: 'FunctionDeclaration',
        loc:{start:{line:1,column:15},end:{line:1,column:33},source:''},
        generator: false,
        async: true,
        id: null,
        params: [],
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:31},end:{line:1,column:33},source:''},
          body: []
        }
      }
    },
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:34},end:{line:1,column:37},source:''},
      expression: {
        type: 'Identifier',
        loc:{start:{line:1,column:34},end:{line:1,column:37},source:''},
        name: 'foo'
      }
    }
  ]
}

tokens (11x):
       ID_export ID_default ID_async ID_function PUNC_PAREN_OPEN
       PUNC_PAREN_CLOSE PUNC_CURLY_OPEN PUNC_CURLY_CLOSE IDENT ASI
`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._

## AST Printer

Printer output different from input [module][annexb:no]:

````js
export default async function() {}
foo;
````

Produces same AST
