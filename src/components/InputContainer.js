import React from 'react';

import Input from './Input.js'

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: ['input-1'], inputsCount: 1 };
    this.appendInput = this.appendInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
  }

  appendInput() {
    var newInput = `input-${this.state.inputsCount + 1}`;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    this.setState(prevState => ({ inputsCount: prevState.inputsCount + 1 }));
  }

  removeInput() {
    var newInputs = this.state.inputs
    newInputs.pop()
    this.setState({ inputs: newInputs });
    this.setState(prevState => ({ inputsCount: prevState.inputsCount - 1 }));
  }

  render() {
    console.log(this.state)
    return (
      <form>
          <div id="inputs">
            {this.state.inputs.map(input => <Input count={this.state.inputsCount} key={input} />)}
          </div>
          <button className="btn btn-success mr-2" type="button" onClick={this.appendInput}>Add</button>
          <button className="btn btn-danger mr-2" type="button" onClick={this.removeInput}>Remove</button>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form> 
    );
  }
}

export default InputContainer;