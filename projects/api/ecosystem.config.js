module.exports = {
  apps: [
    {
      name: 'TangoUnion',
      script: './dist/main.js',
      logs: './logs',
      merge_logs: true,
      time: true,
    },
  ],
};
