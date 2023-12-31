import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  private data = [
    {"Pridelek": "Por", "ProdanaKolicina": "98"},
    {"Pridelek": "Jajca", "ProdanaKolicina": "78"},
    {"Pridelek": "Jabolčni sok", "ProdanaKolicina": "61"},
    {"Pridelek": "Banana", "ProdanaKolicina": "59"}

  ];
  private svg;
  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 500 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Pridelek))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Pridelek))
      .attr("y", d => y(d.ProdanaKolicina))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.ProdanaKolicina))
      .attr("fill", "#78BD4A");
  }


  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }
}

