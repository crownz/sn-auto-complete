import * as React from 'react';

import { fetchSuggestions, SuggestionResponse, Suggestion } from '../../services/suggest';
import { debounce } from '../../services/debounce';

import Input from './Input';

import * as Styles from './AutoSuggest.scss';

interface State {
  value: string;
  suggestions: {
    [key: string]: Suggestion[];
  };
}

class AutoSuggest extends React.Component<any> {
  state: State = {
    value: '',
    suggestions: {},
  };

  getSuggestions = debounce((value: string) => {
    if (value !== '' && !this.state.suggestions[value]) {
      console.log('did not have suggestions yet, fetching..');
      fetchSuggestions(value).then((res: SuggestionResponse) => {
        const newSuggestions = {
          ...this.state.suggestions,
          [value]: res.suggestions, 
        };
  
        this.setState({ suggestions: newSuggestions });
      });
    }    
  });

  handleChange = (value: string) => {
    console.log('changed:', value);
    this.setState({ value }, () => this.getSuggestions(value));
  }

  renderSuggestions = () => {
    const suggestions = this.state.suggestions[this.state.value];

    return suggestions ? suggestions.map((suggestion, idx) => (
      <div key={idx} dangerouslySetInnerHTML={{ __html: suggestion._highlight.suggestion }} />
    )) : null;
  }

  render() {
    return (
      <div className={Styles.container}>
        <Input value={this.state.value} onChange={this.handleChange} label="Preke" />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default AutoSuggest;
