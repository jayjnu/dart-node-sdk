import ejs from 'ejs';
import { Workspace } from './workspace';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';

export interface TemplateModel {
  name: string;
  className: string;
}

export function replaceFileName(
  baseFilename: string,
  options: Record<string, string>
): string {
  return Object.entries(options).reduce((acc, [name, replacer]) => {
    const exp = `__${name}__`;

    return acc.replace(exp, replacer);
  }, baseFilename);
}

export function names(moduleName: string): TemplateModel {
  return {
    name: toSnakeCase(moduleName),
    className: toPascalCase(moduleName),
  };
}

function toSnakeCase(value: string) {
  return [...value]
    .map((char, i) => {
      if (isCapitalLetter(char)) {
        const prefix = i > 0 ? '-' : '';

        return `${prefix}${char.toLowerCase()}`;
      }

      return char;
    })
    .join('');
}

function isCapitalLetter(char: string) {
  return /[A-Z]/.test(char);
}

function toPascalCase(value: string) {
  return capitalize(value).replace(/-([a-z])/g, ($m, $1) => $1.toUpperCase());
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function render(template: string, model: TemplateModel): string {
  return ejs.render(template, model);
}

export interface RenderResult {
  code: string;
  filename: string;
}

export class Template {
  render(moduleName: string, name: string): RenderResult[] {
    const model = names(name);
    const files = this.getTemplateFiles(moduleName);

    return files.map((file) => {
      const template = this.readTemplate(moduleName, file);
      const code = render(template, model);
      const filename = this.renameTemplateFile(model.name, file);

      return {
        code,
        filename,
      };
    });
  }

  private renameTemplateFile(moduleName: string, file: string) {
    return replaceFileName(file, { moduleName, tpl: '' });
  }

  private readTemplate(moduleName: string, filename: string) {
    return readFileSync(this.getTemplatePath(moduleName, filename), {
      encoding: 'utf-8',
    });
  }

  private getTemplatePath(moduleName: string, filename = ''): string {
    return join(__dirname, '../generator', moduleName, 'templates', filename);
  }

  private getTemplateFiles(moduleName: string): string[] {
    return this.listDir(this.getTemplatePath(moduleName));
  }

  private listDir(dir: string): string[] {
    return readdirSync(dir);
  }
}
