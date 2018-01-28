import * as React from 'react';

import * as Styles from './SuggestionsList.scss';

interface Props {
  onSelect: (strinValue: string) => void;
  suggestions: Suggestion[];
}

const SuggestionsList = ({ suggestions, onSelect }: Props) => (
  <div className={Styles.container}>
    {suggestions.map((suggestion, idx) => (
      <div
        key={`${idx}-${suggestion.suggestion}`}
        className={Styles.item}
        onClick={() => onSelect(suggestion.suggestion)}
        dangerouslySetInnerHTML={{ __html: suggestion._highlight.suggestion }}
      />
    ))}
  </div>
);

export default SuggestionsList;
