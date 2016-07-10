import React from 'react';
import { shallow } from 'enzyme';

import { HelloEnv } from './hello-env';

function setup(props) {
  const component = shallow(<HelloEnv {...props} />);
  return {
    component,
    pre: component.find('pre'),
  }
}

describe('HelloEnv', () => {

  it('renders footer prev', () => {
    const { pre } = setup({env: 'production'});
    expect(pre.text()).toEqual('NODE_ENV: production');
  });

});
