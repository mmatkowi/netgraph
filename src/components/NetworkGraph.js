import React from 'react';

import * as d3 from 'd3';
import { select } from 'd3-selection'

class NetworkGraph extends React.Component {
  constructor(props) {
    super(props)
    this.createNetworkGraph = this.createNetworkGraph.bind(this)
  }

  componentDidMount() {
    //this.createNetworkGraph()
  } 

  componentDidUpdate() {
    this.createNetworkGraph()
  }

  createNetworkGraph() {
    /*const graph = this.graph
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])
    
    select(graph)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
  
    select(graph)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
  
    select(graph)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)*/
    const graph = this.graph;
    select(graph).selectAll("*").remove();

    const links = this.props.data.links.map(d => Object.create(d));
    const nodes = this.props.data.nodes.map(d => Object.create(d));

    function color() {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return d => scale(d.group);
    }

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const drag = simulation => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      
      function dragged(event,d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      
      function dragended(event,d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    const link = select(graph)
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = select(graph)
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", color)
      .call(drag(simulation));

    node.append("title")
      .text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    //invalidation.then(() => simulation.stop());
  }

  render() {
    return (
      <div className="graph">
        <svg ref={graph => this.graph = graph} height={this.props.height} viewBox={[-this.props.width / 2, -this.props.height / 2, this.props.width, this.props.height]}/>
      </div>
    );
  }
}

export default NetworkGraph;