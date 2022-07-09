import { stdin, stdout } from 'process'
import readline, { Interface } from 'readline'
import Charm from 'charm'

const charm = Charm()

import chalk from 'chalk'
import { log } from 'console'
import { randomInt } from 'crypto'
charm.pipe(process.stdout)
charm.reset()

// stdout.on('data', (data) => {
//   stdout.write(chalk.yellow(data.toString()))
// })

const createInterface = () => {
  return readline.createInterface({
    input: stdin,
    output: stdout,
    terminal: true,
    prompt: '',
  })
}

async function confirm(message: string): Promise<boolean> {
  const rl = createInterface()

  return new Promise((resolve) => {
    rl.question(
      chalk` {white.dim >} {white ${message}} {whiteBright (y/n)} `,
      (answer: string) => {
        resolve(answer === 'y')
      }
    )
  })
}

async function question(message: string): Promise<string> {
  const rl = createInterface()

  return new Promise((resolve) => {
    rl.question(chalk` {white.dim >} {white ${message}} `, (answer: string) => {
      rl.close()
      resolve(answer)
    })
  })
}

const prompt = {
  confirm,
  question,
}

const exec = async () => {
  charm.foreground('white')
  charm.write('> ')

  charm.foreground('yellow')
  charm.write('Welcome to the CLI!')
  charm.down(1)
  charm.write('This is a test')
  charm.left(10)

  charm.write('\n')

  await prompt.confirm('Are you sure?').then((result) => {
    console.log(result)
  })

  await prompt.question('How your name?').then((result) => {
    console.log(result)
  })
}
exec()
