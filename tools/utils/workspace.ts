import WorkspaceJson from '../../workspace.json';
import { join } from 'path';

export function getWorkspace(): Workspace {
  return new Workspace(WorkspaceJson);
}

interface FileNames {
  impl: string;
  spec: string;
}

interface ModuleDescriptor {
  test?: boolean;
}

export function getFileNames(
  moduleType: string,
  moduleName: string
): FileNames {
  return {
    impl: `${moduleName}.${moduleType}.ts`,
    spec: `${moduleName}.${moduleType}.spec.ts`,
  };
}

export function resolveModulePath(
  sourceRoot: string,
  filename: string
): string {
  return join(__dirname, '../../', sourceRoot, filename);
}

export class Workspace {
  constructor(private json: typeof WorkspaceJson) {}

  getRootPath(): string {
    return join(__dirname, '../../');
  }

  resolve(filename: string): string {
    return resolveModulePath(this.json.sourceRoot, filename);
  }

  getModule(moduleName: string): ModuleDescriptor | null {
    return (
      (this.json.modules as Record<string, ModuleDescriptor>)[moduleName] ||
      null
    );
  }

  has(moduleName: string): boolean {
    return this.getModule(moduleName) !== null;
  }
}
