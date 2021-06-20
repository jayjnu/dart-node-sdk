import { mapEntries } from './object.util';

describe('mapEntries(obj, mapper)', () => {
  it('object 의 entry를 순회하며 mapper가 생성한 새로운 object를 반환한다.', () => {
    type EntryType = [string, string];
    const input = {
      name: 'hello ',
      description: '  world! ',
    };
    const trim = ([key, value]: EntryType): EntryType => [key, value.trim()];

    const output = mapEntries<string, string>(input, trim);

    expect(output).toEqual({
      name: 'hello',
      description: 'world!',
    });
  });
});
