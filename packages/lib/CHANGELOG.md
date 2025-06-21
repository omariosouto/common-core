# 1.1.0-beta20256211750527731PR7 - 2025-6-21

This pull request updates the `packages/lib` module to enhance its functionality and improve code organization. Key changes include restructuring the `exports` in `package.json`, adding new dependencies, and introducing a new utility for converting time strings to milliseconds.
### Updates to `package.json`:
* Modified the `exports` field to point to TypeScript source files instead of compiled JavaScript, and corrected the path for the `test` export.
* Added new dependencies: `@types/ms`, `date-fns`, and `ms`, to support date manipulation and string-to-milliseconds conversion.
### New date utilities:
* [`packages/lib/src/date.ts`](diffhunk://#diff-7ae16a177b300c29e534cd44cb462add66d465d2a41a4945421d21990b1b61dfR1): Added an export for all utilities in the `date` module.
* [`packages/lib/src/date/index.ts`](diffhunk://#diff-941c99dcab8bdd6f41fe6d0650c37f1373dbb054a1a86ca547dd4abe61ae6d61R1-R2): Introduced exports for `toMilliseconds` and `date-fns` utilities, centralizing date-related functionality.
* [`packages/lib/src/date/toMilliseconds/index.ts`](diffhunk://#diff-66c4f1806a9fb1b7fe53298ef7109ad4c5dd02ed134e044c61b93f0b41fef05fR1-R7): Implemented the `toMilliseconds` function, which converts time strings (e.g., "2h", "30m") to milliseconds using the `ms` library.


# 1.0.5 - 2025-5-8

Just adding tests


# 1.0.4 - 2025-4-21

Just adjusting how we export lodash stuff


# 1.0.3 - 2025-4-21

We need this type to be able to work with values like money on Web (for fast previews) and Back End (To ensure that we are handling thigns properly)


# 1.0.2 - 2025-4-19

Just reexporting lodash types


# 1.0.1 - 2025-4-18

Here I'm just exposing the first version of the library with lodash built-in and sleep function
Remember:
- If you are a library using me, always expose as a `peerDependency`, if you are a final app use as `dependency`.


