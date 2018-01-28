interface Window {
  __REDUX_STATE__: any;
}
interface Suggestion {
  suggestion: string;
  _highlight: {
    suggestion: string;
  };
}

interface SuggestionResponse {
  suggestion_count: number;
  suggestions: Suggestion[];
}

declare module '*.scss' {
  const content: any;
  export = content
}