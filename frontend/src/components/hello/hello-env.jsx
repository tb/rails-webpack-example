import React from 'react';

import './hello-env.scss';

export class HelloEnv extends React.Component {
  static propTypes = {
    env: React.PropTypes.string.isRequired,
  };

  render() {
    const { env } = this.props;

    return (
      <div>
        <h4>HelloEnv Component</h4>
        <pre className={env}>
          NODE_ENV: {env}
        </pre>
      </div>
    );
  }
}
