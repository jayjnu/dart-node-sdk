import { replaceFileName, names, render } from './template';

describe('replaceFileName()', () => {
  it('should replace __expression__ to given name', () => {
    const moduleName = 'list';
    const tpl = '';
    const fileName = '__moduleName__.api.ts__tpl__';

    const result = replaceFileName(fileName, { moduleName, tpl });

    expect(result).toBe('list.api.ts');
  });
});

describe('names()', () => {
  describe('ReturnValue.name', () => {
    it('should be of snake-case', () => {
      const moduleName = 'MyListItem';

      const result = names(moduleName);

      expect(result.name).toBe('my-list-item');
    });
  });

  describe('ReturnValue.className', () => {
    it.each([
      ['my-list-item', 'MyListItem'],
      ['MyListItem', 'MyListItem'],
      ['myListItem', 'MyListItem'],
    ])('should be of PascalCase', (given, expected) => {
      expect(names(given).className).toBe(expected);
    });
  });
});

describe('render', () => {
  it('should render template', () => {
    const model = {
      name: 'list-item',
      className: 'ListItem',
    };
    const template = `
      class <%= className %> {
        name = '<%= name %>';
      }
    `;
    const result = `
      class ListItem {
        name = 'list-item';
      }
    `;

    expect(render(template, model)).toBe(result);
  });
});
