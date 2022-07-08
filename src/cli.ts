#!/usr/bin/env node
import path from 'path'
import { Command } from './command'

const cli = new Command()

cli
  .name('guru {command}')
  .description(require('../package.json').description)
  .version(require('../package.json').version)

cli.argument('[string]', 'argument')

// process.argv = [...process.argv, 'temp/src', 'node01', 'node02', '--recursive']

export default cli

cli.parse(process.argv)
