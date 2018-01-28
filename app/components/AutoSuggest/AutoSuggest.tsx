import * as React from 'react';

import Input from './Input';

import * as Styles from './AutoSuggest.scss';

interface State {
  value: string;
  suggestions: string[];
}

class AutoSuggest extends React.Component<any> {
  state: State = {
    value: '',
    suggestions: [],
  };

  handleChange = (value: string) => {
    console.log('changed:', value);
    this.setState({ value });
  }

  render() {
    return (
      <div className={Styles.container}>
        <Input value={this.state.value} onChange={this.handleChange} label="Preke" />
      </div>
    );
  }
}

export default AutoSuggest;
