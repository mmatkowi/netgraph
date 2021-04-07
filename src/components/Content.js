import React from 'react';

import InputContainer from './InputContainer.js';

class Content extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="mt-4">Network Description</h1>
        <InputContainer />
      </div>
    );
  }
}

export default Content;