import React from 'react';

class Input extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const attr = target.name;
    const value = target.value;
    this.props.updateFormData(this.props.id, attr, value)
  }

  handleAdd(e) {
    e.preventDefault();
    this.props.appendInput();
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.removeInput(this.props.id);
  }

  render() {
    let button;
    this.props.buttonType === "add"
    ? button = <button style={{width: '4ch'}} className="btn btn-success" onClick={this.handleAdd}>+</button>
    : button = <button style={{width: '4ch'}} className="btn btn-danger" onClick={this.handleRemove}>-</button>

    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Communication</span>
        </div>
        <input name="source" type="text" className="form-control" placeholder="Source" onChange={this.handleChange} />
        <input name="destination" type="text" className="form-control" placeholder="Destination" onChange={this.handleChange} />
        <input name="service" type="text" className="form-control" placeholder="Service" onChange={this.handleChange} />
        <div className="input-group-append">
          {button}
        </div>
      </div>
    );
  }

}

export default Input;