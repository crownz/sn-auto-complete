import express from 'express';
import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';
import api from './api';
import { renderHtml } from './utils/server-side-rendering';

const app = express();
const port = process.env.PORT || 3001;

const AppManifestFile = `${__dirname}/../server/app-manifest.json`;
const appManifest = JSON.parse(fs.readFileSync(AppManifestFile, 'utf8'));

let appBundleFilename = 'app.js';
let vendorBundleFilename = 'vendors.js';
let stylesBundleFilename = 'styles.css'; 

if (process.env.NODE_ENV === 'dev') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
} else {
  if (appManifest.app && appManifest.app.js) {
    appBundleFilename = appManifest.app.js;
  }
  if (appManifest.app && appManifest.app.css) {
    stylesBundleFilename = appManifest.app.css;
  }
  if (appManifest.vendors && appManifest.vendors.js) {
    vendorBundleFilename = appManifest.vendors.js;
  }
}

app.use('/api', api);
app.use('/bundle', express.static(path.resolve(__dirname, '../build')));

app.use((req, res) => {
  res.send(renderHtml(appBundleFilename, vendorBundleFilename, stylesBundleFilename));    
});

const server = app.listen(port, function () {
  console.log('Server is running @ localhost:%s', port);
});
