import * as React from 'react';

import AutoSuggest from '../AutoSuggest';

import * as Styles from './app.scss';

interface AppProps {

}

interface AppState {

}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
  }

  render() {
    return (
      <div className={Styles.container} data-hook="app-container">
        <div className={Styles.title}>
          Paieška
        </div>
        <AutoSuggest />        
      </div>
    );
  }
}
