var maricopaSvg = d3.select('#maricopa');
var maricopaSvgWidth = maricopaSvg.node().clientWidth;
var maricopaSvgHeight = maricopaSvg.node().clientHeight;
// console.log(maricopaSvgWidth, maricopaSvgHeight)

var maricopaSvgData;
var maricopaProjection;

Promise.all([d3.json('data/MaricopaCounty_VotingPrecincts.geojson')])
    .then(data => {
        maricopaSvgData = data[0];

        maricopaProjection = d3.geoMercator()    
                        .fitSize([maricopaSvgWidth, maricopaSvgHeight-4], maricopaSvgData)
        
        const geoPath = d3.geoPath().projection(maricopaProjection);
        
        maricopaSvg.selectAll('.precinct')
                .data(maricopaSvgData.features)
                .join('path')
                .classed('precinct',true)
                .attr('d',geoPath)  
});

var zoom = d3.zoom()
    .scaleExtent([1, 4])
    .on('zoom',zoomed)
    maricopaSvg.call(zoom);

function zoomed() {                     
    maricopaSvg.selectAll('.precinct')
    .attr('transform', d3.event.transform);
}

