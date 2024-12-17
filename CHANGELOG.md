# @u-wave/react-translate change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.3
* Add React 19 to `peerDependencies` range.

Tests are no longer run on React 17 because writing tests for many React versions is difficult.
However, `@u-wave/react-translate` v2 still works on React 17.

No changes will be made to the implementation of this package in the v2.x line.

## 2.0.2
* Add React 18 to `peerDependencies` range.

## 2.0.1
* Renames the "module" entry point to end in `.es.js`.
  `.mjs` has requirements that this package's compiled output did not adhere to.

## 2.0.0
* Require React 17+.

## 1.2.0
* Update dependencies.
* Mark the package as side-effect-free.

## 1.1.1
* Lower minimum version in the `react` peerDependency.

## 1.1.0
* Add React Hook API for use with React 16.7+. ([#11](https://github.com/u-wave/react-translate/pull/11))

## 1.0.0
* Initial release.
