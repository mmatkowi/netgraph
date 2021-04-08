import React from 'react';

import Input from './Input.js'

import { v4 as uuidv4 } from 'uuid';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: [ {id: uuidv4(), source: '', destination:'', service:''} ], inputsCount: 1 };
    this.appendInput = this.appendInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.inputIsLast = this.inputIsLast.bind(this);
  }

  appendInput() {
    var newInput = {id: uuidv4(), source: '', destination: '', service: ''};
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    this.setState(prevState => ({ inputsCount: prevState.inputsCount + 1 }));
  }

  removeInput(id) {
    this.setState(prevState => ({ inputs: prevState.inputs.filter(input => input.id !== id) }))
    this.setState(prevState => ({ inputsCount: prevState.inputsCount - 1 }));
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  updateFormData(id, attr, value) {
    var index = this.state.inputs.indexOf(input => input.id === id);
    this.setState({
      inputs: [
          ...this.state.inputs.slice(0,index),
          Object.assign({}, this.state.inputs[index], {[attr]: value}),
          ...this.state.inputs.slice(index+1)
      ]
    });
  }

  inputIsLast(id) {
    var index = this.state.inputs.findIndex(input => input.id === id);
    return (index + 1 === this.state.inputs.length);
  }

  render() {
    return (
      <form>
          <div id="inputs">
            {this.state.inputs.map(input => <Input removeInput={this.removeInput} appendInput={this.appendInput} buttonType={this.inputIsLast(input.id) ? "add" : "remove"} key={input.id} id={input.id} updateFormData={this.updateFormData}/>)}
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form> 
    );
  }
}

export default InputContainer;