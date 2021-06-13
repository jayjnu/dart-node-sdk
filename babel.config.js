const TEST_PLUGINS = [];

const PROD_PLUGINS = [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '~': './lib',
      },
    },
  ],
];

module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: [
      ['@babel/env', { targets: { node: 'current' } }],
      '@babel/typescript',
    ],
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      ...(isTest ? TEST_PLUGINS : PROD_PLUGINS),
    ],
    ignore: isTest ? [] : ['**/__tests__', '**/*.spec.ts'],
  };
};
