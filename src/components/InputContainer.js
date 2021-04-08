import React from 'react';

import Input from './Input.js'

class InputContainer extends React.Component {

  render() {
    return (
      <form>
          <div id="inputs">
            {this.props.inputs.map(input => <Input removeInput={this.props.removeInput} appendInput={this.props.appendInput} buttonType={this.props.inputIsLast(input.id) ? "add" : "remove"} key={input.id} id={input.id} updateFormData={this.props.updateFormData}/>)}
          </div>
          <button className="btn btn-primary" onClick={this.props.refreshGraph}>Submit</button>
      </form> 
    );
  }

}

export default InputContainer;