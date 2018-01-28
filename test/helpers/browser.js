require('ts-node').register({ fast: true });
require('jsdom-global/register');
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

Enzyme.configure({ adapter: new Adapter() });
