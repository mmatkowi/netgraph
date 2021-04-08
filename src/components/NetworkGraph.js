import React from 'react';

import { Graph } from "react-d3-graph";

class NetworkGraph extends React.Component {
  render() { 
    // the graph configuration, just override the ones you need
    const myConfig = {
      nodeHighlightBehavior: true,
      directed: true,
      d3: {
        gravity: -100
      },
      node: {
        color: "lightgreen",
        size: 200,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    };
    
    const onClickNode = function(nodeId) {
      window.alert(`Clicked node ${nodeId}`);
    };
    
    const onClickLink = function(source, target) {
      window.alert(`Clicked link between ${source} and ${target}`);
    };

    return (
      <div className="graph">
        <Graph
          id="graph-id" // id is mandatory
          data={this.props.data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      </div>
    );
  }
}

// graph payload (with minimalist structure)



export default NetworkGraph;