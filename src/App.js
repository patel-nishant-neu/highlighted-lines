import React, { useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';

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
  useEffect(() => {
    const svg = d3.select('#svg-container');

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 2)
      .attr('x1', d => data.nodes.find(node => node.id === d.source).x + 30)
      .attr('y1', d => data.nodes.find(node => node.id === d.source).y + 30)
      .attr('x2', d => data.nodes.find(node => node.id === d.target).x + 30)
      .attr('y2', d => data.nodes.find(node => node.id === d.target).y + 30);

    const node = svg.append('g')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .selectAll('rect')
      .data(data.nodes)
      .join('rect')
      .attr('width', 120)
      .attr('height', 60)
      .attr('fill', 'blue')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('rx', 10) // Rounded corners for better aesthetics
      .attr('ry', 10);

    const text = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .attr('class', 'label')
      .attr('x', d => d.x + 30)
      .attr('y', d => d.y + 35)
      .attr('text-anchor', 'middle')
      .attr('dx', '2.5em')
      .text(d => d.id);

    node.on('mouseover', (event, d) => {
      node.attr('fill', o => o.id === d.id ? 'lightblue' : 'blue');
      link.attr('stroke', o => o.source === d.id || o.target === d.id ? 'red' : '#999');
      link.attr('stroke-width', 5)
    });

    node.on('mouseout', () => {
      node.attr('fill', 'blue');
      link.attr('stroke', '#999');
    });
  }, []);

  return (
    <svg id="svg-container" width="800" height="600" style={{ border: '1px solid black' }}></svg>
  );
};

export default App;