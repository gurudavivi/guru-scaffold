import chalk from 'chalk'
import { Command as Commander, CommandOptions, Option } from 'commander'

// type Verbosity = 'error' | 'warn' | 'info' | 'debug' | 'verbose'
enum Verbosity {
  'silent',
  'quiet',
  'normal',
  'verbose',
  'debug',
}

const option = {
  verbosity: {
    silent: new Option('--silent', 'silent output')
      .implies({
        verbosity: Verbosity.silent,
      })
      .conflicts(['quiet', 'normal', 'verbose', 'debug']),
    quiet: new Option('--quiet', 'quiet output')
      .implies({
        verbosity: Verbosity.quiet,
      })
      .conflicts(['silent', 'verbose', 'debug']),

    verbose: new Option('--verbose', 'verbose output')
      .implies({
        verbosity: Verbosity.verbose,
      })
      .conflicts(['silent', 'quiet', 'debug']),
    debug: new Option('--debug', 'debug mode')
      .implies({
        verbosity: Verbosity.debug,
      })
      .conflicts(['silent', 'quiet', 'verbose'])
      .hideHelp(),
    verbosity: new Option('--verbosity [level]', 'verbosity level')
      .choices(['silent', 'quiet', 'verbose', 'debug'])
      .default('normal')
      .hideHelp(process.env.DEBUG !== 'true'),
  },
  output: {
    color: new Option('--color', 'color output')
      .conflicts('no-color')
      .default(true)
      .hideHelp(),
    noColor: new Option('--no-color', 'disable color output')
      .conflicts('color')
      .implies({ color: false })
      .hideHelp(),
  },
  general: {
    config: new Option('--config <path>', 'config file path').hideHelp(),
    dryRun: new Option('--dry-run', 'dry run (no changes)').hideHelp(),
  },
}

export class Command extends Commander {
  constructor(name?: string) {
    super(name)

    // general options
    this.addOption(option.general.config)
    this.addOption(option.general.dryRun)

    // verbosity: Verbosity.normal
    // this.addOption(option.verbosity.silent)
    // this.addOption(option.verbosity.quiet)
    // this.addOption(option.verbosity.verbose)
    // this.addOption(option.verbosity.debug)

    // output: color
    this.addOption(option.output.color)
    this.addOption(option.output.noColor)

    // configure help
    this.configureHelp({
      sortOptions: false,
      sortSubcommands: false,
    })

    this.configureOutput({
      //   writeOut: (str) => chalk.yellow(str),
      outputError: (str, write) => write(chalk.red(str)),
    })
  }

  addCommand(cmd: Command, opts?: CommandOptions): this {
    cmd.copyInheritedSettings(this)
    return this
  }
}
