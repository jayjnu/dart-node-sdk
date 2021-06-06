module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: ['@babel/env', '@babel/typescript'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '~': './lib',
          },
        },
      ],
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
    ],
    ignore: isTest ? [] : ['**/__tests__', '**/*.spec.ts'],
  };
};
