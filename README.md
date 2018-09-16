# `gh-stats-cli`

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/gh-stats-cli.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/gh-stats-cli.svg?branch=master)](https://travis-ci.org/jaebradley/gh-stats-cli)
[![npm](https://img.shields.io/npm/dt/gh-stats-cli.svg)](https://www.npmjs.com/package/gh-stats-cli)
[![npm](https://img.shields.io/npm/v/gh-stats-cli.svg)](https://www.npmjs.com/package/gh-stats-cli)

Get simple `GitHub` `PR` contribution statistics (`PR`s authored and commented on) via the command line.

## Installation

```bash
npm install --global @jaebradley/gh-stats-cli
```

## Usage

* You'll need [a `GitHub` personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) to authenticate `GitHub` API requests
* The CLI will store the personal access token in the `keychain` when executing `ghstats setup`
* Because the CLI gets details for each PR (like comments, or merge time) it may make a decent number of API calls
  * The per hour API limit for personal access tokens is `5,000`
  * You'll always be asked to confirm that you'd like to make the API calls
* You'll need to specify a username
* You can optional specify an `organization`
* The current options are
  * `ghstats setup` - save your personal access token to the `keychain`
  * `ghstats week` - gets contributions over the past `7` days
  * `ghstats past-day` - gets contributions over the past day (i.e. `24` hours)

## Examples

![first](https://imgur.com/uUdwHUs.png)

![second](https://imgur.com/j15lN3e.png)
