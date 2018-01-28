import 'jsdom-global/register';
import * as globalJsdom from 'jsdom-global';
import * as React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SuggestionsList, { Props } from './SuggestionsList.tsx';

describe('Component: SuggestionsList', () => {

  let cleanup;

  beforeEach(() => cleanup = globalJsdom.default);
  afterEach(() => {
    cleanup();
  });

  it('should render SuggestionsList component', () => {
    const driver = createDriver();
    expect(driver.element('suggestions-container').exists()).to.be.true;
  });

  it('should render 2 suggestions', () => {
    const driver = createDriver();
    expect(driver.suggestions().count()).to.equal(2);
  });

  it('should render no suggestions', () => {
    const driver = createDriver({ suggestions: [] });
    expect(driver.suggestions().count()).to.equal(0);
  });

  it('should call onSelect action', () => {
    const spy = sinon.spy();
    const driver = createDriver({ onSelect: spy });
    driver.suggestions().at(0).select();
    expect(spy.calledOnce).to.be.true;
  });
});

const createDriver = (newProps = {}) => {
  const wrapper = shallow(
    <SuggestionsList { ...getProps(newProps) } />,
  );

  return {
    element: (hook: string) => {
      const el = wrapper.find(`[data-hook="${hook}"]`);
      return {
        exists: () => el.length > 0,
      };
    },
    suggestions: () => {
      const suggestions = wrapper.find(`[data-hook="suggestion"]`);
      return {
        count: () => suggestions.length,
        at: (idx: number) => {
          const suggestion = suggestions.at(0);
          return {
            select: () => suggestion.simulate('click'),
          };
        },
      };
    },
  };
};

const defaultProps: Props = {
  suggestions: [
    {
      suggestion: 'Car',
      _highlight: {
        suggestion: '<span>Car</span>',
      },
    },
    {
      suggestion: 'Other car',
      _highlight: {
        suggestion: 'Other <span>Car</span>',
      },
    },
  ],
  onSelect: () => {},
};

const getProps = (newProps: Partial<Props>): Props => {
  return Object.assign({}, defaultProps, newProps);
};
