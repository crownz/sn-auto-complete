import 'jsdom-global/register';
import * as globalJsdom from 'jsdom-global';
import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './app.tsx';

describe('Component: App', () => {

  let cleanup;

  beforeEach(() => cleanup = globalJsdom.default);
  afterEach(() => {
    cleanup();
  });

  it('should render App component', () => {
    const driver = createDriver();
    expect(driver.element('app-container').exists()).to.be.true;
  });
});

const createDriver = (newProps = {}) => {
  const wrapper = shallow(
    <App { ...getProps(newProps) } />,
  );

  return {
    element: (hook: string) => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.length > 0,
      };
    },
  };
};

const getProps = (newProps) => {
  return Object.assign({}, newProps);
};
