// set the dimensions and margins of the graph
const margin = {top: 60, right: 20, bottom: 50, left: 40};
const width = 450 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

// EXPECTED DEMOCRATIC SEATS
const svg = d3.select("#PA_seats")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-15 25 465 200")
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
d3.csv("data/PA_cd_2020_stats.csv")
.then(function(data){

    var seatsData = [];
    
    for(i in data) {
        seatsData.push(data[i]["e_dem"])
    }
    // console.log(seatsData)

    // X scale
    const xScale = d3.scaleLinear()
        .domain([0,17])
        .range([0, width]);

    // Y scale
    var yScale = d3.scaleLinear()
        .range([height, 0]);

    // set horizontal grid line
    const GridLine = () => d3.axisLeft().scale(yScale);
    svg
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-width,0,0)
            .tickFormat("")
            .ticks(10)
        );

    // set vertical grid line
    const VGridLine = () => d3.axisBottom().scale(xScale);
    svg
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(height, 0, 0)
            .tickFormat("")
            .ticks(10))

    svg
        .append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(4).tickPadding(3))

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value(d => d)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(125));

    // prepare data for bars
    const bins = histogram(seatsData)

    // Scale the range of the data in the y domain
    yScale.domain([0, 1000]);

    const yAxis = svg.append("g")
        .call(d3.axisLeft(yScale).tickSize(3).tickPadding(4))

    // append the bar rectangles to the svg element
    svg
    .selectAll("rect")
        .data(bins)
    .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => height - yScale(d.length))
        .style("fill", "#8888ab")

    // set X axis label
    svg
    .append("text")
        .attr("class", "chart-label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom/1.7)
        .attr("text-anchor", "middle")
    .text("Average Number of Democratic Seats");

    // set Y axis label
    svg
    .append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(-90)')
        .attr("x", -185)
        .attr("y", -37)
        .attr("text-anchor", "start")
    .text("Number of Simulated Plans")

    svg.append("line")
        .attr("x1", xScale(9.3))
        .attr("y1", 0)
        .attr("x2", xScale(9.3))
        .attr("y2", height)
        .style("stroke-width", 3)
        .style("stroke", "#D39F29")
        .style("fill", "none");

    svg.append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(90)')
        .attr('x', height - 235)
        .attr('y', - xScale(9.7))
        .attr("text-anchor", "start")
    .text("Enacted Plan")

})

// DEVIATION FROM PARTISAN SYMMETRY
const psymSvg = d3.select("#OH_psym")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-15 25 465 200")
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/OH_cd_2020_stats.csv")
.then(function(data){

    var seatsData = [];
    
    for(i in data) {
        seatsData.push(data[i]["pbias"])
    }
    // console.log(seatsData)

    // X scale
    const xScale = d3.scaleLinear()
        .domain([-.05,.15])
        .range([0, width]);

    // Y scale
    const yScale = d3.scaleLinear()
        .range([height, 0]);

    // set horizontal grid line
    const GridLine = () => d3.axisLeft().scale(yScale);
    psymSvg
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-width,0,0)
            .tickFormat("")
            .ticks(10)
        );

    // set vertical grid line
    const VGridLine = () => d3.axisBottom().scale(xScale);
    psymSvg
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(height, 0, 0)
            .tickFormat("")
            .ticks(10))

            psymSvg
        .append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(4).tickPadding(3))

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value(d => d)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(125));

    // prepare data for bars
    const bins = histogram(seatsData)

    // Scale the range of the data in the y domain
    yScale.domain([0, 3500]);

    const yAxis = psymSvg.append("g")
        .call(d3.axisLeft(yScale).tickSize(3).tickPadding(4))

    // append the bar rectangles to the svg element
    psymSvg
    .selectAll("rect")
        .data(bins)
    .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => height - yScale(d.length))
        .style("fill", "#8888ab")

    // set X axis label
    psymSvg
    .append("text")
        .attr("class", "chart-label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom/1.7)
        .attr("text-anchor", "middle")
    .text("Deviation from Partisan Symmetry");

    // set Y axis label
    psymSvg
    .append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(-90)')
        .attr("x", -185)
        .attr("y", -37)
        .attr("text-anchor", "start")
    .text("Number of Simulated Plans")

    psymSvg.append("line")
        .attr("x1", xScale(0.119048))
        .attr("y1", 0)
        .attr("x2", xScale(0.119048))
        .attr("y2", height)
        .style("stroke-width", 3)
        .style("stroke", "#D39F29")
        .style("fill", "none");

    psymSvg.append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(90)')
        .attr('x', height - 235)
        .attr('y', - xScale(.1235))
        .attr("text-anchor", "start")
    .text("Enacted Plan")

})

// EFFICIENCY GAP
const egapSvg = d3.select("#FL_egap")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-15 25 465 200")
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/FL_cd_2020_stats.csv")
.then(function(data){

    var seatsData = [];
    
    for(i in data) {
        seatsData.push(data[i]["egap"])
    }
    // console.log(seatsData)

    // X scale
    const xScale = d3.scaleLinear()
        .domain([-.02,.21])
        .range([0, width]);

    // Y scale
    const yScale = d3.scaleLinear()
        .range([height, 0]);

    // set horizontal grid line
    const GridLine = () => d3.axisLeft().scale(yScale);
    egapSvg
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-width,0,0)
            .tickFormat("")
            .ticks(10)
        );

    // set vertical grid line
    const VGridLine = () => d3.axisBottom().scale(xScale);
    egapSvg
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(height, 0, 0)
            .tickFormat("")
            .ticks(10))

    egapSvg
        .append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(4).tickPadding(3))

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value(d => d)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(125));

    // prepare data for bars
    const bins = histogram(seatsData)

    // Scale the range of the data in the y domain
    yScale.domain([0, 500]);

    const yAxis = egapSvg.append("g")
        .call(d3.axisLeft(yScale).tickSize(3).tickPadding(4))

    // append the bar rectangles to the svg element
    egapSvg
    .selectAll("rect")
        .data(bins)
    .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => height - yScale(d.length))
        .style("fill", "#8888ab")

    // set X axis label
    egapSvg
    .append("text")
        .attr("class", "chart-label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom/1.7)
        .attr("text-anchor", "middle")
    .text("Efficiency Gap");

    // set Y axis label
    egapSvg
    .append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(-90)')
        .attr("x", -185)
        .attr("y", -37)
        .attr("text-anchor", "start")
    .text("Number of Simulated Plans")

    egapSvg.append("line")
        .attr("x1", xScale(0.15865518))
        .attr("y1", 0)
        .attr("x2", xScale(0.15865518))
        .attr("y2", height)
        .style("stroke-width", 3)
        .style("stroke", "#D39F29")
        .style("fill", "none");

    egapSvg.append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(90)')
        .attr('x', height - 235)
        .attr('y', - xScale(.164))
        .attr("text-anchor", "start")
    .text("Enacted Plan")

})

// POLSBY POPPER
const ppSvg = d3.select("#IL_polsby")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-15 25 465 200")
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/IL_cd_2020_stats.csv")
.then(function(data){

    var seatsData = [];
    
    for(i in data) {
        seatsData.push(data[i]["avg_polsby"])
    }
    // console.log(seatsData)

    // X scale
    const xScale = d3.scaleLinear()
        .domain([.1, .41])
        .range([0, width]);

    // Y scale
    const yScale = d3.scaleLinear()
        .range([height, 0]);

    // set horizontal grid line
    const GridLine = () => d3.axisLeft().scale(yScale);
    ppSvg
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-width,0,0)
            .tickFormat("")
            .ticks(10)
        );

    // set vertical grid line
    const VGridLine = () => d3.axisBottom().scale(xScale);
    ppSvg
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(height, 0, 0)
            .tickFormat("")
            .ticks(10))

    ppSvg
        .append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(4).tickPadding(3))

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value(d => d)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(125));

    // prepare data for bars
    const bins = histogram(seatsData)

    // Scale the range of the data in the y domain
    yScale.domain([0, 260]);

    const yAxis = ppSvg.append("g")
        .call(d3.axisLeft(yScale).tickSize(3).tickPadding(4))

    // append the bar rectangles to the svg element
    ppSvg
    .selectAll("rect")
        .data(bins)
    .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => height - yScale(d.length))
        .style("fill", "#8888ab")

    // set X axis label
    ppSvg
    .append("text")
        .attr("class", "chart-label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom/1.7)
        .attr("text-anchor", "middle")
    .text("Average Polsby Popper");

    // set Y axis label
    ppSvg
    .append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(-90)')
        .attr("x", -185)
        .attr("y", -37)
        .attr("text-anchor", "start")
    .text("Number of Simulated Plans")

    ppSvg.append("line")
        .attr("x1", xScale(0.142865294117647))
        .attr("y1", 0)
        .attr("x2", xScale(0.142865294117647))
        .attr("y2", height)
        .style("stroke-width", 3)
        .style("stroke", "#D39F29")
        .style("fill", "none");

    ppSvg.append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(90)')
        .attr('x', height - 235)
        .attr('y', -xScale(.15))
        .attr("text-anchor", "start")
    .text("Enacted Plan")

})

// COUNTIES SPLIT
const countySvg = d3.select("#SC_county")
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "-15 25 465 200")
    .attr("preserveAspectRatio", "xMinYMin")
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data/SC_cd_2020_stats.csv")
.then(function(data){

    var seatsData = [];
    
    for(i in data) {
        seatsData.push(data[i]["county_splits"])
    }
    // console.log(seatsData)

    // X scale
    const xScale = d3.scaleLinear()
        .domain([0, 11.5])
        .range([0, width]);

    // Y scale
    const yScale = d3.scaleLinear()
        .range([height, 0]);

    // set horizontal grid line
    const GridLine = () => d3.axisLeft().scale(yScale);
    countySvg
        .append("g")
            .attr("class", "grid")
        .call(GridLine()
            .tickSize(-width,0,0)
            .tickFormat("")
            .ticks(10)
        );

    // set vertical grid line
    const VGridLine = () => d3.axisBottom().scale(xScale);
    countySvg
        .append("g")
            .attr("class", "grid")
        .call(VGridLine()
            .tickSize(height, 0, 0)
            .tickFormat("")
            .ticks(10))

    countySvg
        .append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickSize(4).tickPadding(3))

    // set the parameters for the histogram
    const histogram = d3.bin()
        .value(d => d)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(125));

    // prepare data for bars
    const bins = histogram(seatsData)

    // Scale the range of the data in the y domain
    yScale.domain([0, 2500]);

    const yAxis = countySvg.append("g")
        .call(d3.axisLeft(yScale).tickSize(3).tickPadding(4))

    // append the bar rectangles to the svg element
    countySvg
    .selectAll("rect")
        .data(bins)
    .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", d => `translate(${xScale(d.x0)}, ${yScale(d.length)})`)
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => height - yScale(d.length))
        .style("fill", "#8888ab")

    // set X axis label
    countySvg
    .append("text")
        .attr("class", "chart-label")
        .attr("x", width/2)
        .attr("y", height+margin.bottom/1.7)
        .attr("text-anchor", "middle")
    .text("County Splits");

    // set Y axis label
    countySvg
    .append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(-90)')
        .attr("x", -185)
        .attr("y", -37)
        .attr("text-anchor", "start")
    .text("Number of Simulated Plans")

    countySvg.append("line")
        .attr("x1", xScale(10))
        .attr("y1", 0)
        .attr("x2", xScale(10))
        .attr("y2", height)
        .style("stroke-width", 3)
        .style("stroke", "#D39F29")
        .style("fill", "none");

    countySvg.append("text")
        .attr("class", "chart-label")
        .attr('transform', 'rotate(90)')
        .attr('x', height - 235)
        .attr('y', -xScale(10.2))
        .attr("text-anchor", "start")
    .text("Enacted Plan")

})