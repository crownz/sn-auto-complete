const searchApiURL ='https://api.searchnode.net/v1/query/suggestions?query_key=BskBa9ot8oPymxEyKank4u6eXqvIHxsO&suggest_query=';

export function fetchSuggestions(query: string) {
  return fetch(
    searchApiURL + encodeURIComponent(query),
  ).then(response => response.json());
}
