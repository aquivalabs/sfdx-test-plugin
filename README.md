sfdx-test-runner
================

Generates beautiful reports from SF test runs

[![Version](https://img.shields.io/npm/v/sfdx-test-runner.svg)](https://npmjs.org/package/sfdx-test-runner)
[![CircleCI](https://circleci.com/gh/nchursin/sfdx-test-runner/tree/master.svg?style=shield)](https://circleci.com/gh/nchursin/sfdx-test-runner/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/nchursin/sfdx-test-runner?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-test-runner/branch/master)
[![Codecov](https://codecov.io/gh/nchursin/sfdx-test-runner/branch/master/graph/badge.svg)](https://codecov.io/gh/nchursin/sfdx-test-runner)
[![Greenkeeper](https://badges.greenkeeper.io/nchursin/sfdx-test-runner.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/nchursin/sfdx-test-runner/badge.svg)](https://snyk.io/test/github/nchursin/sfdx-test-runner)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-test-runner.svg)](https://npmjs.org/package/sfdx-test-runner)
[![License](https://img.shields.io/npm/l/sfdx-test-runner.svg)](https://github.com/nchursin/sfdx-test-runner/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-test-runner
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-test-runner/0.1.0 darwin-x64 node-v12.7.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx testdx:force:apex:run [-n <array> | -s <array> | -t <array>] [-d <directory>] [-l RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests] [-w <minutes>] [-y] [-r human|tap|junit|json] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-testdxforceapexrun--n-array---s-array---t-array--d-directory--l-runlocaltestsrunalltestsinorgrunspecifiedtests--w-minutes--y--r-humantapjunitjson--u-string---apiversion-string---verbose---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx testdx:force:apex:run [-n <array> | -s <array> | -t <array>] [-d <directory>] [-l RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests] [-w <minutes>] [-y] [-r human|tap|junit|json] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

By default, runs all Apex tests in the org’s namespace.

```
USAGE
  $ sfdx testdx:force:apex:run [-n <array> | -s <array> | -t <array>] [-d <directory>] [-l 
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

  By default, runs all Apex tests in the org’s namespace.

  To run specific test classes, specify class names or suite names, or set a --testlevel value.

  To run specific test methods, use --tests.

  Examples:
      $ sfdx force:apex:test:run
      $ sfdx force:apex:test:run -n MyClassTest,MyOtherClassTest -r human
      $ sfdx force:apex:test:run -s MySuite,MyOtherSuite -c --json
      $ sfdx force:apex:test:run -t 
  MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis -r human
      $ sfdx force:apex:test:run -l RunLocalTests -d <path to outputdir> -u me@my.org

EXAMPLES
  $ sfdx testdx:force:apex:run -n MyClassTest,MyOtherClassTest
  $ sfdx testdx:force:apex:run -s MySuite,MyOtherSuite
  $ sfdx testdx:force:apex:run -t 
  MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis
  $ sfdx testdx:force:apex:run -l RunLocalTests -u me@my.org
```

_See code: [src/commands/testdx/force/apex/run.ts](https://github.com/nchursin/sfdx-test-runner/blob/v0.1.0/src/commands/testdx/force/apex/run.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
