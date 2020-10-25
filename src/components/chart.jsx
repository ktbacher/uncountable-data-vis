import React, {Component} from 'react';
import * as d3 from 'd3';
import data from '../data/data';

class Chart extends Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.prop1 !== nextProps.prop1 || this.props.prop2 !== nextProps.prop2) {
          return true;
        }
        if (this.props.data.length !== nextProps.data.length) {
            return true;
        }
        for (var i=0;i<this.props.data.length; i++) {
            if (this.props.data[i] !== nextProps.data[i]) {
                return true;
            }
        }
        return false;
      }

    componentDidMount() {
        this.drawChart(this.props.prop1, this.props.prop2);
    }

    componentDidUpdate() {
        this.drawChart(this.props.prop1, this.props.prop2);
    }

    drawChart(prop1, prop2) {
        const w = 670;
        const h = 400;

        const svg = d3.select('#chart')
            .append("svg") 
            .attr("width", w)
            .attr("height", h)
            .style("background-color", "#ffffff")
            .style("padding", 10)
            .style("margin-left", 50)
            .style("color", "black")
        
        let tooltip = d3.select("body").append("div")				
            .style("z-index", "10")
            .style("background", "#ffffff")
            .style("position", "absolute")
            .style("color", "#000")
            .attr("class", "tooltip")				
            .style("opacity", 0)
            .style("border-radius", 10);

        var scalex = d3.scaleLinear()
            .domain([d3.min(Object.keys(data).map(exp => {return data[exp].outputs[prop1]})), 
                    d3.max(Object.keys(data).map(exp => {return data[exp].outputs[prop1]}))])
            .range([35, w -10]);

        var x_axis = d3.axisBottom()
            .scale(scalex);

        var scaley = d3.scaleLinear()
            .domain([d3.min(Object.keys(data).map(exp => {return data[exp].outputs[prop2]})), 
                    d3.max(Object.keys(data).map(exp => {return data[exp].outputs[prop2]}))])
            .range([h-20, 10]);

        var y_axis = d3.axisLeft()
            .scale(scaley);

        svg.selectAll("circle")
            .data(this.props.data)
            .enter()
                .append("circle")
                .attr("cx", (d,i) => scalex(data[d].outputs[prop1]))
                .attr("cy", (d,i) => scaley(data[d].outputs[prop2]))
                .attr("r", 5)
                .attr("fill", "tomato")
                .on('mouseover', function(e,d) {
                    tooltip.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                    tooltip.html(d)	
                        .style("left", (e.pageX-10) + "px")		
                        .style("top", (e.pageY - 28) + "px")
                        .style("width", d.length *9 +'px')})
                .on('mouseout', () => {
                    tooltip.transition()		
                        .duration(500)		
                        .style("opacity", 0);})
            .exit().remove()
                
        svg.append("g")
            .attr("transform", "translate(0, "+ String(h-20)+")")
            .call(x_axis);
        svg.append("g")
            .attr("transform", "translate(35, 0)")
            .call(y_axis);
    }


    render() {
        return (
            <div id="chart" key={this.props.prop1+this.props.prop2+this.props.data.reduce((acc, curr)=> {return acc+curr}, "")} ref={this.myRef}></div>
        )
    }
}

export default Chart;