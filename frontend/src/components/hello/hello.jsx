import React from 'react';

import { HelloEnv } from './hello-env';

export class Hello extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello Component</h2>
        <HelloEnv env={process.env.NODE_ENV} />
      </div>
    );
  }
}
