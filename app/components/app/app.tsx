import * as React from 'react';
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
        App container!
      </div>
    );
  }
}
