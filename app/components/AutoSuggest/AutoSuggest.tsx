import * as React from 'react';

import { fetchSuggestions } from '../../services/suggest';
import { debounce } from '../../services/debounce';

import Input from './Input';
import SuggestionsList from './SuggestionsList';

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
      fetchSuggestions(value).then((res: SuggestionResponse) => {
        const suggestions = {
          ...this.state.suggestions,
          [value]: res.suggestions, 
        };
  
        this.setState({ suggestions });
      });
    }    
  });

  handleChange = (value: string) => {
    this.setState({ value }, () => this.getSuggestions(value));
  }

  handleSelect = (value: string) => {
    this.setState({ value });
  }

  render() {
    const { suggestions, value } = this.state;

    return (
      <div className={Styles.container}>
        <Input value={value} onChange={this.handleChange} label="Preke" />
        {
          value &&
          suggestions[value] &&
          <SuggestionsList suggestions={suggestions[value]} onSelect={this.handleSelect} />
        }
      </div>
    );
  }
}

export default AutoSuggest;
