TestDX
================

Generates beautiful reports from SF test runs

[![Version](https://img.shields.io/npm/v/testdx.svg)](https://npmjs.org/package/testdx)
<!-- [![CircleCI](https://circleci.com/gh/nchursin/sfdx-test-runner/tree/master.svg?style=shield)](https://circleci.com/gh/nchursin/sfdx-test-runner/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/nchursin/sfdx-test-runner?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-test-runner/branch/master)
[![Codecov](https://codecov.io/gh/nchursin/sfdx-test-runner/branch/master/graph/badge.svg)](https://codecov.io/gh/nchursin/sfdx-test-runner)
[![Greenkeeper](https://badges.greenkeeper.io/nchursin/sfdx-test-runner.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/nchursin/sfdx-test-runner/badge.svg)](https://snyk.io/test/github/nchursin/sfdx-test-runner)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-test-runner.svg)](https://npmjs.org/package/testdx)
[![License](https://img.shields.io/npm/l/sfdx-test-runner.svg)](https://github.com/nchursin/sfdx-test-runner/blob/master/package.json) -->

<!-- install -->
<!-- usage -->
```sh-session
$ sfdx plugins:install testdx
$ sfdx testdx:COMMAND
running command...
USAGE
  $ sfdx testdx:COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* `testdx:apex:run` - generates an HTML report from Apex test run

```
USAGE
  $ sfdx testdx:apex:run [-n <array> | -s <array> | -t <array>] [-d <directory>] [-l 
  RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests] [-w <minutes>] [-y] [-r human|tap|junit|json] [-u <string>] 
  [--apiversion <string>] [--verbose] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         directory to store test run files
  -l, --testlevel=(RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests)                testlevel enum value

  -n, --classnames=classnames                                                       comma-separated list of Apex test
                                                                                    class names to run

  -r, --resultformat=(human|tap|junit|json)                                         result format emitted to stdout;
                                                                                    --json flag overrides this parameter

  -s, --suitenames=suitenames                                                       comma-separated list of Apex test
                                                                                    suite names to run

  -t, --tests=tests                                                                 comma-separated list of Apex test
                                                                                    class names or IDs and, if
                                                                                    applicable, test methods to run

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -w, --wait=wait                                                                   the streaming client socket timeout
                                                                                    (in minutes)

  -y, --synchronous                                                                 run tests from a single class
                                                                                    synchronously

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --verbose                                                                         display Apex test processing details

DESCRIPTION
  To run specific test classes, specify class names or suite names, or set a --testlevel value.

  To run specific test methods, use --tests.

  Generates html report.

EXAMPLES
  $ sfdx testdx:apex:run -n MyClassTest,MyOtherClassTest
  $ sfdx testdx:apex:run -s MySuite,MyOtherSuite
  $ sfdx testdx:apex:run -t 
  MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis
  $ sfdx testdx:apex:run -l RunLocalTests -u me@my.org
```

_See code: [src/commands/testdx/force/apex/run.ts](https://github.com/nchursin/sfdx-test-runner/blob/v0.1.0/src/commands/testdx/force/apex/run.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
