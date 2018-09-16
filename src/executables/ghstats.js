#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('GitHub stats from the command line')
  .command('setup', 'add GitHub Personal Access Token')
  .command('week', 'get GitHub contribution stats over past 7 days')
  .command('past-day', 'get Github contribution stats over the past 24 hour')
  .parse(process.argv);
