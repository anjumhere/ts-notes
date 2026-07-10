# TypeScript Notes

Personal TypeScript learning repo — notes, practice code, and snippets, built while going from React (JavaScript) to full-stack TypeScript.

Not a tutorial. This is a working log: concepts as I learn them, code as I test them, and the small things that trip people up along the way.

## Structure

```
typescript/
├── src/
│   ├── basics/
│   │   └── types-vs-interface.md      # Core differences: declaration merging, implements, and extends
│   ├── practice/
│   │   ├── 01-union-types.ts          # Union types and limiting assignment values
│   │   ├── 02-any-type.ts             # The 'any' type and how to safely avoid it using unions
│   │   ├── 03-type-narrowing.ts       # Narrowing types via typeof, truthiness, and exhaustive checks
│   │   ├── 04-discriminated-union.ts  # Discriminated unions for reliable api response structures
│   │   ├── 05-type-assertion.ts       # Forceful type assertion ('as' keyword) with JSON.parse examples
│   │   ├── 06-never-type.ts           # Exhaustiveness checks and infinite loops with never
│   │   ├── 07-interfaces-vs-types.ts  # Implementing classes using types vs interfaces
│   │   ├── 08-intersection.ts         # Combining and intersecting multiple object models with &
│   │   ├── 09-objects.ts              # Object literal type assignments and nested configurations
│   │   ├── 10-duck-typing.ts          # Structured/duck-typing compatibility rules
│   │   ├── 11-partial-and-pick.ts     # Utility types: Partial<T> and Pick<T, K>
│   │   ├── 12-required-and-omit.ts    # Utility types: Required<T> and Omit<T, K>
│   │   ├── 13-functions-and-invariants.ts # Functions, optional/defaults, void/never, and custom type predicates
│   │   ├── 14-generics.ts             # Generic functions, interfaces, constraints, and classes
│   │   ├── arrays.ts                  # Arrays, readonly arrays, 2D arrays, and named tuples
│   │   ├── enums.ts                   # Numeric, string, and heterogeneous enums, and reverse mapping
│   │   ├── first.ts                   # Empty initial practice file
│   │   ├── index.ts                   # Consolidated entry point for execution & validation
│   │   └── oops.ts                    # Object-oriented programming: access modifiers, shorthand constructors, inheritance, and abstract classes
│   ├── react-ts/
│   │   └── typing-hooks.md            # React typing guides for hooks, state, and props (placeholder)
│   ├── snippets/
│   │   └── useful-utility-type.md     # Transformation snippets for Readonly<T> and Record<K, V>
│   └── notes.md                       # Comprehensive Master Handbook for compiler internals & language features
├── package.json
├── tsconfig.json
└── README.md
```

- **src/basics/** — Fundamental TypeScript concepts (types, interfaces, generics, inference)
- **src/practice/** — Hands-on `.ts` exercises and files covering specific type mechanics and edge cases
- **src/react-ts/** — TypeScript specifically in a React context (props, hooks, event types)
- **src/snippets/** — Copy-paste-ready utility types and patterns for future projects
- **src/notes.md** — Master Reference Handbook containing compiler pipeline stages, type system details, and practice exercises

## Why this exists

Learning by documenting. If I can explain it clearly enough to write down, I actually understand it — not just recognize it.

## Currently working through

- TypeScript fundamentals → applying it to the [Jobsync](https://github.com/anjumhere/Jobsync-Backend) frontend
- Typing React components, hooks, and API responses end-to-end

## Author

**Adnan Anjum** — [GitHub](https://github.com/anjumhere)
Full stack developer
