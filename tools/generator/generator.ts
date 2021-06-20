import { join } from 'path';
import { writeFileSync } from 'fs';
import { getWorkspace, Workspace } from '../utils/workspace';
import { Template, RenderResult } from '../utils/template';
import colors from 'colors/safe';

export interface GeneratorOptions {
  name: string;
  module: string;
  test?: boolean;
}

export function generator(options: GeneratorOptions): Generator {
  const workspace = getWorkspace();
  const template = new Template();

  return new Generator(workspace, template, options);
}

export class Generator {
  constructor(
    private workspace: Workspace,
    private template: Template,
    private options: GeneratorOptions
  ) {}

  init(): never | void {
    this.validateWorkspaceConfig();
    const files = this.template.render(this.options.module, this.options.name);

    files.forEach((file) => {
      Generator.generateFile(this.workspace.resolve(this.options.module), file);
    });
  }

  private validateWorkspaceConfig(): never | void {
    if (!this.workspace.has(this.options.module)) {
      throw new Error(
        `Invalid Module "${this.options.module}"\nTo generate a new module, add module "${this.options.module}" to workspace.json`
      );
    }
  }

  private static generateFile(
    outputPath: string,
    { code, filename }: RenderResult
  ) {
    const filePath = join(outputPath, filename);

    console.log(colors.cyan('[CREATE] %s in %s'), filename, filePath);

    try {
      writeFileSync(filePath, code, { encoding: 'utf-8', flag: 'wx' });
    } catch (e) {
      if (e.code === 'EEXIST') {
        console.error(colors.red('[CREATE] file already exsist! aborting'));
        return;
      }
      throw e;
    }
  }
}
