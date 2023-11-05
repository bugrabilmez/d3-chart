import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

export const axis = {
    X: 'X',
    Y: 'Y'
}
export const axisLocation = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

export const type = {
    LINE: 'LINE',
    RECT: 'RECT'
}

const createAxis = ({svg, className, axisType, translate, fn, scale, tickSize, tickValues, hideTickLabel,}) => {
    const ax = fn(scale)
        .tickSize(tickSize)
        .tickValues(tickValues)
        .tickFormat((d) => {
            if (hideTickLabel?.find(x => x === d)) {
                return null;
            } else {
                return d;
            }
        });

    const gXAxis = svg.append("g")
        .attr("class", className)
        .attr("transform", translate)
        .call(ax);

    if (hideTickLabel && hideTickLabel.length > 0) {
        gXAxis.selectAll(".tick line")
            .attr(axisType === axis.X ? "y2" : "x2", (d) => {
                if (hideTickLabel.find(x => x === d)) {
                    return tickSize / 2;
                } else {
                    return tickSize
                }
            });
    }
}

const createX = ({xScale, svg, svgHeight, xOptions }) => {
    let fn;
    let translate;
    if (xOptions.location === axisLocation.TOP) {
        fn = d3.axisTop;
        translate = `translate(0, 0)`;
    } else if (xOptions.location === axisLocation.BOTTOM) {
        fn = d3.axisBottom;
        translate = `translate(0, ${svgHeight})`;
    } else {
        throw new Error('Undefined X Axis!');
    }

    createAxis({
        axisType: axis.X,
        svg,
        className: 'x-axis',
        translate,
        fn,
        scale: xScale,
        tickSize: xOptions.tickSize,
        tickValues: xOptions.tickValues,
        hideTickLabel: xOptions.hideTickLabel
    })
}

const createY = ({ svg, yScale, yOptions, svgWidth }) => {
    let fn;
    let translate;
    if (yOptions.location === axisLocation.RIGHT) {
        fn = d3.axisRight;
        translate = `translate(${svgWidth}, 0)`;
    } else if (yOptions.location === axisLocation.LEFT) {
        fn = d3.axisLeft;
        translate = `translate(0, 0)`;
    } else {
        throw new Error('Undefined Y axis!');
    }

    createAxis({
        axisType: axis.Y,
        svg,
        className: 'y-axis',
        translate,
        fn,
        scale: yScale,
        tickSize: yOptions.tickSize,
        tickValues: yOptions.tickValues,
        hideTickLabel: yOptions.hideTickLabel
    });
}

const createData = ({ chartType, svg, xScale, yScale, data }) => {

    if (chartType === type.RECT) {
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => { return xScale(d.xStart); })
            .attr("y", (d) => { return yScale(d.yStart); })
            .attr("width", (d) => { return xScale(d.xEnd) - xScale(d.xStart); })
            .attr("height", (d) => { return (yScale(d.yEnd) - yScale(d.yStart)); })
    } else if (chartType === type.LINE) {
        svg.selectAll("dataLine")
            .data(data)
            .enter()
            .append("line")
            .attr("class", 'dataLine')
            .attr("style", "stroke:rgb(255,0,0);stroke-width:1")
            .attr("x1", (d) => { return xScale(d.xStart); })
            .attr("y1", (d) => { return yScale(d.yStart); })
            .attr("x2", (d) => { return xScale(d.xEnd); })
            .attr("y2", (d) => { return yScale(d.yEnd); })
    } else {
        throw new Error('Undefined chart type!');
    }

}

const LineChart = ({width, height, margin, data, id, xOptions, yOptions, type}) => {

    const svgRef = useRef(null);
    const xScale = useRef(null);
    const yScale = useRef(null);

    const svgWidth = width - margin.left - margin.right,
        svgHeight = height - margin.top - margin.bottom;


    useEffect(() => {

        const el = d3.select(`#${id}`).selectAll('svg');
        if (el) {
            el.remove();
        }

        svgRef.current = d3.select(`#${id}`)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xScale.current = d3.scaleLinear()
            .domain(xOptions.range)
            .range([0, svgWidth]);

        yScale.current = d3.scaleLinear()
            .domain(yOptions.range)
            .range([svgHeight, 0]);

        createData({ chartType: type, svg: svgRef.current, xScale: xScale.current, yScale: yScale.current, data });
        createX({ xScale: xScale.current, svg: svgRef.current, xOptions, svgHeight });
        createY({ yScale: yScale.current, svg: svgRef.current, yOptions, svgWidth });


    },[])

    return (
        <div id={id} key={id}></div>
    )
}


export default LineChart;