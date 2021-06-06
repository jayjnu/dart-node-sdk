import { generator } from '../generator/generator';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import colors from 'colors/safe';

const options = yargs(hideBin(process.argv))
  .option('module', {
    alias: 'm',
    type: 'string',
    demandOption: true,
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    demandOption: true,
  })
  .help().argv;

const gen = generator(options);

try {
  gen.init();
} catch (e) {
  console.error(colors.red(e.message));
  process.exit(1);
}
