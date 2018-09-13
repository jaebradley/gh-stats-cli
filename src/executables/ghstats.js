#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('GitHub stats from the command line')
  .command('setup', 'add GitHub Personal Access Token')
  .command('stats', 'get contribution stats from GitHub')
  .parse(process.argv);
