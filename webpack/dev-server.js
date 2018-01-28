const nodemon = require('nodemon');

const monitor = nodemon({
    script: 'server/index.js',
    ext: 'js json',
    env: { NODE_ENV: 'dev' },
});

['crash', 'exit'].forEach(event =>
  monitor.on(event, () => console.log(`nodemon: Express has stopped because of (${event})`))
);
  