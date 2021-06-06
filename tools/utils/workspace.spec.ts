import { getWorkspace, getFileNames } from './workspace';

describe('getWorkspace()', () => {
  it('should return workspace json object', () => {
    expect(getWorkspace()).toBeDefined();
  });
});

describe('getFileNames', () => {
  it('should create impl filename', () => {
    const moduleType = 'api';
    const moduleName = 'list';

    const { impl } = getFileNames(moduleType, moduleName);

    expect(impl).toBe('list.api.ts');
  });

  it('should create spec filename', () => {
    const moduleType = 'api';
    const moduleName = 'list';

    const { spec } = getFileNames(moduleType, moduleName);

    expect(spec).toBe('list.api.spec.ts');
  });
});
