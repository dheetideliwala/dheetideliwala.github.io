const scatterSvg = d3.select('#scatter')
.attr("viewBox", "-60 5 50 750")
.attr("preserveAspectRatio", "xMinYMin")

var scatterWidth = scatterSvg.style('width').replace('px','');
var scatterHeight = scatterSvg.style('height').replace('px','');
var scatterMargin = { top: 30, bottom: 30, right: 0, left: 0};
var innerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
var innerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;
let scatterData;

var xAttrib, xValue, xNum;
var yAttrib, yValue, yNum;

var toolTip;

function drawScatterPlot() {

    // Title of X and Y axis
    const xTitle = d3.select('#x-axis').property('value');
    const yTitle = d3.select('#y-axis').property('value');

    // set xAttrib and xValue
    if(xTitle == "Expected Democratic Seats") {
        // console.log("dem")
        xAttrib = "DemSeats"
        xValue = "d."+xAttrib
    }
    else if(xTitle == "Efficiency Gap") {
        // console.log("egap")

        xAttrib = "Egap";
        xValue = "d."+xAttrib
    }
    else if(xTitle == "Partisan Symmetry") {
        // console.log("psym")

        xAttrib = "Psym";
        xValue = "d."+xAttrib
    }
    else if(xTitle == "Polsby Popper") {
        // console.log("pp")

        xAttrib = "Polsby"
        xValue = "d."+xAttrib
    }
    else {
        xAttrib = "County"
        xValue = "d."+xAttrib
    }  

    // set yAttrib and yValue
    if(yTitle == "Expected Democratic Seats") {
        yAttrib = "DemSeats"
        yValue = "d."+yAttrib
    }
    else if(yTitle == "Efficiency Gap") {
        yAttrib = "Egap";
        yValue = "d."+yAttrib
    }
    else if(yTitle == "Partisan Symmetry") {
        yAttrib = "Psym";
        yValue = "d."+yAttrib
    }
    else if(yTitle == "Polsby Popper") {
        yAttrib = "Polsby"
        yValue = "d."+yAttrib
    }
    else {
        yAttrib = "County"
        yValue = "d."+yAttrib
    }


    // console.log(`x = ${xAttrib}, y = ${yAttrib}`);

    // X, Y, color, and stroke scales
    const xScale = d3.scaleLinear()
                    .domain([0, 100]) // data space
                    .range([0, innerWidth]); // pixel space

    // console.log(xScale)
    const yScale = d3.scaleLinear()
                    .domain([0, 100]) // data space
                    .range([innerHeight, 0]); // pixel space

    const colorScale = d3.scaleOrdinal()
        .domain(["IRC", "non-IRC"])
        .range(["#28386C", "#5b852a"])

    const strokeScale = d3.scaleOrdinal()
        .domain(["IRC_avg", "NIRC_avg", "AZ","CA","ID","WA","MT","CO","MI","NY","AL","AR","CT","FL","GA","HI","IL","IN","IA","KS","KY","LA","ME","MD","MA","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NC","OH","OK","OR","PA","RI","SC","TN","TX","UT","VA","WV","WI","CO","MI","NY"])
        .range(["#D39F29", "#D39F29", ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,])

    // remove previous g elements
    scatterSvg.select('g').remove();

    const g = scatterSvg.append('g')
                .attr('transform', 'translate('+margin.left+', '+margin.top+')');;

    // 10. Draw the scatterplot's x and y axes and add label axes
    const GridLine = () => d3.axisLeft().scale(yScale);
    g
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-innerWidth,0,0)
            .tickFormat("")
            .ticks(10)
        );

    const VGridLine = () => d3.axisBottom().scale(xScale);
    g
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(innerHeight, 0, 0)
            .tickFormat("")
            .ticks(10))

    const yAxis = d3.axisLeft(yScale)

    g.append('g').call(yAxis.tickSize(4).tickPadding(3))
    .attr('font-size', '10000')

    const xAxis = d3.axisBottom(xScale)

        g.append('g').call(xAxis.tickSize(4).tickPadding(3))
        .attr('transform',`translate(0,${innerHeight})`)

    // toolTip
    d3.select('#tooltip').attr('hidden', true);

    toolTip = d3.select('html').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 30)
    // const tooltip = d3.select("body")
    // .append("div")
    //     .attr("class", "tooltip");

    // append circles
    g.selectAll('circle')
     .data(scatterData)
     .enter()
     .append('circle')
    //  .attr('id', d => d.Name.replaceAll(' ','_'))
     .attr('cx', d => xScale(d[xAttrib]))
     .attr('cy', d => yScale(d[yAttrib]))
     .attr('r', 10)
     .attr('fill', d => colorScale(d["Type"]))
     .style('stroke',d => strokeScale(d["State"]))
     .style('opacity', .8)    // you can uncomment this line to make the points semi-opaque, but it can lead to separability issues with the color scale
     .style('stroke-width', '4')
     .on('mouseover', function(d, i) {
        // console.log("mouseover", d.State)

        toolTip
            .style('visibility', 'visible')
        d3.select(this)
            .style("opacity", 1)
            .style("stroke", "#000000")
            .style("stroke-width", "2")
    })
    .on("mousemove", function(d, i) {
        xNum = eval(xValue)
        yNum = eval(yValue)
        if(d.State == "IRC_avg") {
            toolTip
            .html(`IRC Average <br> ${xTitle}: ${xNum}% <br> ${yTitle}: ${yNum}%`)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
                .style('font-family', 'Raleway')
        }
        else if(d.State == "NIRC_avg") {
            toolTip
            .html(`non-IRC Average <br> ${xTitle}: ${xNum}% <br> ${yTitle}: ${yNum}%`)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
        }
        else {
            toolTip
            .html(`${d.State} (${d.Type}) <br> ${xTitle}: ${xNum}% <br> ${yTitle}: ${yNum}%`)
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
        }

        // console.log("mousemove", d.State)
    })
    .on("mouseleave", function (d, i) {
        // console.log("mouseleave", d.State)

        toolTip
            .style('visibility', 'hidden')

        d3.select(this)
            .style("opacity", .8)
            .style('stroke',d => strokeScale(d["State"]))
            .style('stroke-width', "4")
    });

    // append chart titles
    g.append('text')
        .attr('x',innerWidth/2)
        .attr('y',innerHeight+75)
        .style('font-size', 'clamp(1rem, 2.5vw, 3rem);')
        .attr('text-anchor','middle')
        .text(xTitle);
    g.append('text')
        .attr('transform','rotate(-90)')
        .attr('y','-65px')
        .attr('x',-innerHeight/2)
        .attr('text-anchor','middle')
        .style('font-size', 'clamp(1rem, 2.5vw, 3rem);')
        .text(yTitle)
}

d3.csv('data/2020_scatter.csv').then(data => {

    // Convert these attributes from string to number type
    data.map(function(d) {
        d.DemSeats = +d.DemSeats;
        d.Egap = +d.Egap;
        d.Psym = +d.Psym;
        d.Polsby = +d.Polsby;
        d.County = +d.County;
    });
    // console.log(data);  // You can check the data in your browser's dev tools

    scatterData = data; // Set the data to the global pokemonData variable
    // console.log(scatterData)
    drawScatterPlot();  // call the function that draws the scatter plot
});

function reportWindowSize() {
    innerWidth = window.innerWidth;
    innerHeight = window.innerHeight;
    scatterSvg.selectAll("*").remove();
    console.log("changing", window.innerWidth, window.innerHeight)
    drawScatterPlot();
}

window.onresize = reportWindowSize;

const changeSvg = d3.select('#change')
.attr("viewBox", "-60 5 50 750")
.attr("preserveAspectRatio", "xMinYMin")

const changeWidth = changeSvg.style('width').replace('px','');
const changeHeight = changeSvg.style('height').replace('px','');
const changeMargin = { top: 30, bottom: 30, right: 0, left: 0};
const changeInnerWidth = scatterWidth - scatterMargin.left - scatterMargin.right;
const changeInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;
let changeData;

var ChangexAttrib, ChangexValue, ChangexNum;

var ChangetoolTip;

function drawPlot() {

    // Title of X and Y axis
    const xMetric = d3.select('#metric').property('value');

    // X, Y, color, and stroke scales
    const xScale = d3.scaleLinear()
                    .domain([0, 100]) // data space
                    .range([0, changeInnerWidth]); // pixel space

    const yScale = d3.scalePoint()
                    .domain(["", "CO", "MI", "NY", "."]) // data space
                    .range([innerHeight, 0]); // pixel space

    const colorScale = d3.scaleOrdinal()
        .domain(["IRC", "non-IRC"])
        .range(["#28386C", "#5b852a"])

    // remove previous g elements
    changeSvg.select('g').remove();

    const g = changeSvg.append('g')
                .attr('transform', 'translate('+margin.left+', '+margin.top+')');

    // 10. Draw the scatterplot's x and y axes and add label axes
    const GridLine = () => d3.axisLeft().scale(yScale);
    g
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-innerWidth,0,0)
            .tickFormat("")
            .ticks(10)
        );

    const VGridLine = () => d3.axisBottom().scale(xScale);
    g
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(innerHeight, 0, 0)
            .tickFormat("")
            .ticks(10))
    
    // set xAttrib and xValue
    if(xMetric == "Expected Democratic Seats") {
        // console.log("dem")
        ChangexAttrib = "DemSeats"
        ChangexValue = "d."+xAttrib
        g.append("line")
            .attr("x1", xScale(14.7))
            .attr("x2", xScale(77.96))
            .attr("y1", yScale("NY"))
            .attr("y2", yScale("NY"))
            .attr("stroke", "black")
            .attr('stroke-width', '2')

        g.append("line")
            .attr("x1", xScale(78.96))
            .attr("x2", xScale(81.7))
            .attr("y1", yScale("CO"))
            .attr("y2", yScale("CO"))
            .attr("stroke", "black")
            .attr('stroke-width', '2')

        g.append("line")
            .attr("x1", xScale(9.54))
            .attr("x2", xScale(96.9))
            .attr("y1", yScale("MI"))
            .attr("y2", yScale("MI"))
            .attr("stroke", "black")
            .attr('stroke-width', '2')
    }
    else if(xMetric == "Efficiency Gap") {
        // console.log("egap")

        ChangexAttrib = "Egap";
        ChangexValue = "d."+xAttrib

        g.append("line")
        .attr("x1", xScale(23.8))
        .attr("x2", xScale(30.96))
        .attr("y1", yScale("CO"))
        .attr("y2", yScale("CO"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

    g.append("line")
        .attr("x1", xScale(30.32))
        .attr("x2", xScale(87.52))
        .attr("y1", yScale("NY"))
        .attr("y2", yScale("NY"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

    g.append("line")
        .attr("x1", xScale(3.3))
        .attr("x2", xScale(94.38))
        .attr("y1", yScale("MI"))
        .attr("y2", yScale("MI"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')
    }
    else if(xMetric == "Partisan Symmetry") {

        ChangexAttrib = "PSym";
        console.log(ChangexAttrib)

        ChangexValue = "d."+xAttrib

        g.append("line")
        .attr("x1", xScale(12.56))
        .attr("x2", xScale(72.46))
        .attr("y1", yScale("CO"))
        .attr("y2", yScale("CO"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        g.append("line")
        .attr("x1", xScale(45.56))
        .attr("x2", xScale(62.7))
        .attr("y1", yScale("NY"))
        .attr("y2", yScale("NY"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        g.append("line")
        .attr("x1", xScale(32.24))
        .attr("x2", xScale(80.54))
        .attr("y1", yScale("MI"))
        .attr("y2", yScale("MI"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')
    }
    else if(xMetric == "Polsby Popper") {
        // console.log("pp")

        ChangexAttrib = "Polsby"
        ChangexValue = "d."+xAttrib

        g.append("line")
        .attr("x1", xScale(22.02))
        .attr("x2", xScale(8.96))
        .attr("y1", yScale("CO"))
        .attr("y2", yScale("CO"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        g.append("line")
        .attr("x1", xScale(98.08))
        .attr("x2", xScale(2.64))
        .attr("y1", yScale("MI"))
        .attr("y2", yScale("MI"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        // g.append("line")
        // .attr("x1", xScale(32.24))
        // .attr("x2", xScale(80.54))
        // .attr("y1", yScale("MI"))
        // .attr("y2", yScale("MI"))
        // .attr("stroke", "black")
        // .attr('stroke-width', '2')
    }
    else {
        ChangexAttrib = "County"
        ChangexValue = "d."+xAttrib

        g.append("line")
        .attr("x1", xScale(99.66))
        .attr("x2", xScale(80))
        .attr("y1", yScale("CO"))
        .attr("y2", yScale("CO"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        g.append("line")
        .attr("x1", xScale(71.08))
        .attr("x2", xScale(100))
        .attr("y1", yScale("MI"))
        .attr("y2", yScale("MI"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')

        g.append("line")
        .attr("x1", xScale(74.3))
        .attr("x2", xScale(100))
        .attr("y1", yScale("NY"))
        .attr("y2", yScale("NY"))
        .attr("stroke", "black")
        .attr('stroke-width', '2')
    }  

    console.log(`x = ${ChangexValue}`);


    const yAxis = d3.axisLeft(yScale)

    g.append('g').call(yAxis.tickSize(4).tickPadding(3))
    .attr('font-size', '10000')

    const xAxis = d3.axisBottom(xScale)

        g.append('g').call(xAxis.tickSize(4).tickPadding(3))
        .attr('transform',`translate(0,${innerHeight})`)

    // toolTip
    d3.select('#changetooltip').attr('hidden', true);

    ChangetoolTip = d3.select('html').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 30)
    // const tooltip = d3.select("body")
    // .append("div")
    //     .attr("class", "tooltip");

    // append circles
    g.selectAll('circle')
     .data(changeData)
     .enter()
     .append('circle')
    //  .attr('id', d => d.Name.replaceAll(' ','_'))
     .attr('cx', d => 
        // console.log(d[ChangexAttrib])
        xScale(d[ChangexAttrib])
    )
     .attr('cy', d => yScale(d['State']))
     .attr('r', 10)
     .attr('fill', d => colorScale(d["Type"]))
    //  .style('opacity', .8)    // you can uncomment this line to make the points semi-opaque, but it can lead to separability issues with the color scale
     .on('mouseover', function(d, i) {
        ChangetoolTip
            .style('visibility', 'visible')
        d3.select(this)
            // .style("opacity", 1)
            .style("stroke", "#000000")
            .style("stroke-width", "2")
    })
    .on("mousemove", function(d, i) {
        ChangexNum = eval(ChangexValue)
        console.log(`x = ${ChangexNum}`);

        ChangetoolTip
        .html(`${d.State} (${d.Type}) <br> ${xMetric}: ${ChangexNum}%`)
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px")
            .attr('stroke', 'black')
            .attr('stroke-width', 4)

    })
    .on("mouseleave", function (d, i) {
        ChangetoolTip
            .style('visibility', 'hidden')

        d3.select(this)
            .style('stroke-width', '0')
            // .style("opacity", .8)
 
    });

    // append chart titles
    g.append('text')
        .attr('x',innerWidth/2)
        .attr('y',innerHeight+75)
        .style('font-size', 'clamp(1rem, 2.5vw, 3rem);')
        .attr('text-anchor','middle')
        .text(xMetric);
}

d3.csv('data/2010-2020_change.csv').then(data => {
    data.map(function(d) {
        d.DemSeats = +d.DemSeats;
        d.Egap = +d.Egap;
        d.Psym = +d.Psym;
        d.Polsby = +d.Polsby;
        d.County = +d.County;
    });

    changeData = data;
    console.log(changeData);
    drawPlot();

})