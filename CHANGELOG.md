# 1.1.3 - 2025-6-29

This pull request updates the date utilities in the `packages/lib/src/date` module by restructuring the way `date-fns` functions are exported. It introduces a dedicated `dateFns` file for organizing all `date-fns` exports and modifies the main index file to reference this new structure.
### Restructuring of date utilities:
* [`packages/lib/src/date/dateFns/index.ts`](diffhunk://#diff-c7181493b86169456756d21fa2b7705c88adeb3663253be71be5fe5c328bc286R1-R213): Added a comprehensive list of exports for all `date-fns` functions, centralizing their management in a dedicated file.
* [`packages/lib/src/date/index.ts`](diffhunk://#diff-941c99dcab8bdd6f41fe6d0650c37f1373dbb054a1a86ca547dd4abe61ae6d61L2-R2): Updated the export path for `date-fns` functions to use the newly created `dateFns` file instead of directly exporting from `date-fns`.


# 1.1.2 - 2025-6-28

This pull request includes a small change to the `packages/lib/src/index.ts` file. The change adds an export for the `lodash-es` library, making its utilities available for use across the project.


# 1.1.1 - 2025-6-28

Charging the way that `date-fns` is exposed to allow users to import the proxied functions


# 1.1.0 - 2025-6-21

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


