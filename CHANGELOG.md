# Changelog

## [0.2.0] - 2019-09-02

### Added

- New flag `--html` to generate html in addition to default output format behaviour
- New `--resultfomrat` option - `html` to generate only html report

## [Version] - 0.1.2

### Added

- We now have a changelog!
- Ability to override warning coverage percentage. By default a report colors in red all the classes which have coverage less then 75%. Use `-C <number>` to override it.
- Now more info is shown in the report regarding the overall coverage.

### Changed

- The command is shorter now. Use `sfdx testdx:apex:run` to run tests
