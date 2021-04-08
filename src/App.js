import React from 'react';

import './App.css';

import { v4 as uuidv4 } from 'uuid';

import InputContainer from './components/InputContainer.js';
import NetworkGraph from './components/NetworkGraph.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { inputs: [ {id: uuidv4(), source: '', destination:'', service:''} ], inputsCount: 1}
    this.appendInput = this.appendInput.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.refreshGraph = this.refreshGraph.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.prepareGraphData = this.prepareGraphData.bind(this);
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
  
  refreshGraph(e) {
    e.preventDefault();
  }

  prepareGraphData() {
    var inputs = this.state.inputs;

    var nodesWithDup = [];
    inputs.map(input => nodesWithDup = nodesWithDup.concat([input.source, input.destination]));
    var nodes = nodesWithDup
      .reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[])
      .map(node => node = {id: node})
      
      var links = [];
      inputs.map(input => links = links.concat([{source: input.source, target: input.destination}]))

    var data = {nodes: nodes, links: links}
    return data;
  }

  updateFormData(id, attr, value) {
    var index = this.state.inputs.findIndex(input => input.id === id);
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
    console.log(this.prepareGraphData())
    return (
      <div id="app">
        <nav className="navbar navbar-expand-sm bg-secondary navbar-light">
          <ul className="navbar-nav">
              <li className="nav-item active">
              <a className="nav-link color-white" href="/">netgraph</a>
              </li>
          </ul>
        </nav>
        <div className="container">
          <h1 className="mt-4">Network Description</h1>
          <InputContainer
            appendInput={this.appendInput}
            removeInput={this.removeInput}
            updateFormData={this.updateFormData}
            refreshGraph={this.refreshGraph}
            inputIsLast={this.inputIsLast}
            inputs={this.state.inputs}
          />
          <h1 className="mt-4">Network Graph</h1>
          <NetworkGraph
            data={this.prepareGraphData()}
          />
        </div>
      </div>
    );
  }

}

export default App;
