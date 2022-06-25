# Why?

- static code analysis: emit warnings and errors
- compile-time type checking
- code level documentation
- typed superset of JS
- compiled into plain JS
- generate into versions of JS (>=ecma3)
- language + compiler + language service
- language: syntax, keywords, type annotations
- compiler: type information erasure and code transformations (transpiles TS into executable JS), static code analysis
- compiling vs transpiling? compiling is human-code=>machine-readable and transpiling is human=>human
- language service: collects type info from source where dev tools can use for intellisense, type hints and refactoring

# Structural typing

- elements are compatitble if each feature of element 1 is identical of element 2
- also if members(attributs) of a type 1 are all included in another one, can set element to type 1 too

# Type inference

- init vars/members
- default values
- function return types

# Type alias (reusable)

```
type Point = {
    x: number;
    y: number;
}
```
