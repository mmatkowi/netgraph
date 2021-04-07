import React from 'react';

class Input extends React.Component {

  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Communication</span>
        </div>
        <input name="source" type="text" className="form-control" placeholder="Source"/>
        <input name="destination" type="text" className="form-control" placeholder="Destination"/>
        <input name="service" type="text" className="form-control" placeholder="Service"/>
      </div>
    );
  }

}

export default Input;