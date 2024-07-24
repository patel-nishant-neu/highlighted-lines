import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const data = {
  nodes: [
    { id: 'Object 1', x: 100, y: 100 },
    { id: 'Object 2', x: 100, y: 200 },
    { id: 'Object 3', x: 100, y: 300 },
    { id: 'Object 4', x: 100, y: 400 },
    { id: 'Object 5', x: 300, y: 100 },
    { id: 'Object 6', x: 300, y: 200 },
    { id: 'Object 7', x: 300, y: 300 },
    { id: 'Object 8', x: 300, y: 400 },
    { id: 'Object 9', x: 500, y: 100 },
    { id: 'Object 10', x: 500, y: 200 },
    { id: 'Object 11', x: 500, y: 300 },
    { id: 'Object 12', x: 500, y: 400 },
  ],
  links: [
    { source: 'Object 1', target: 'Object 5' },
    { source: 'Object 1', target: 'Object 7' },
    { source: 'Object 2', target: 'Object 6' },
    { source: 'Object 3', target: 'Object 7' },
    { source: 'Object 4', target: 'Object 8' },
    { source: 'Object 5', target: 'Object 10' },
    { source: 'Object 6', target: 'Object 11' },
    { source: 'Object 7', target: 'Object 12' },
    { source: 'Object 8', target: 'Object 10' },
    { source: 'Object 9', target: 'Object 11' },
    { source: 'Object 1', target: 'Object 9' },
    { source: 'Object 2', target: 'Object 10' },
    { source: 'Object 3', target: 'Object 11' },
    { source: 'Object 4', target: 'Object 12' },
  ],
};

const App = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX().strength(0.1))
      .force('y', d3.forceY().strength(0.1))
      .stop();

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('rect')
      .data(data.nodes)
      .join('rect')
      .attr('width', 60)
      .attr('height', 60)
      .attr('fill', 'red')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .call(drag(simulation));

    const text = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .attr('class', 'label')
      .attr('x', d => d.x + 30)
      .attr('y', d => d.y + 35)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(d => d.id);

    node.on('mouseover', (event, d) => {
      node.attr('fill', o => o.id === d.id ? 'yellow' : 'red');
      link.attr('stroke', o => o.source.id === d.id || o.target.id === d.id ? 'yellow' : '#999');
    });

    node.on('mouseout', () => {
      node.attr('fill', 'red');
      link.attr('stroke', '#999');
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x + 30)
        .attr('y1', d => d.source.y + 30)
        .attr('x2', d => d.target.x + 30)
        .attr('y2', d => d.target.y + 30);

      node
        .attr('x', d => d.x)
        .attr('y', d => d.y);

      text
        .attr('x', d => d.x + 30)
        .attr('y', d => d.y + 35);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    simulation.tick(300); // Force the simulation to start with the nodes in their initial positions
  }, []);

  return (
    <svg ref={svgRef} width="800" height="600" style={{ border: '1px solid black' }}></svg>
  );
};

export default App;
