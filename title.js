// SVG variables
var usaSvg = d3.select('#states-all-map')
var usaSvgWidth = usaSvg.node().clientWidth;
var usaSvgHeight = usaSvg.node().clientHeight;
var stateSvgWidth = usaSvgWidth - 300;
var stateSvgHeight = usaSvgHeight - 240;

var usaMapData;

var usaProjection;

Promise.all([d3.json('Congressional_Districts.geojson')])
                    .then(data => {
            usaMapData = data[0];

            usaProjection = d3.geoAlbersUsa()    
                               .fitSize([usaSvgWidth, usaSvgHeight], usaMapData);
            
            const geoPath = d3.geoPath().projection(usaProjection);
            
            usaSvg.selectAll('.state')
                    .data(usaMapData.features)
                    .join('path')
                    .classed('state',true)
                    .attr('d',geoPath)
                    .on('mouseover', function(d,i) {
                        console.log(`Mouseover on ${d.properties.OFFICE_ID} and state ${d.properties.STATEFP20}`)
                        d3.select(this).classed('highlighted', true)
                        // trying to highlight to whole state based on geojson objects that have the same state id
                        highlightSelectedState(d.properties.STATEFP20);
                    })
                    .on('mouseout', function(d,i) {
                        console.log(`Mouseout on ${d.properties.OFFICE_ID}`)
                        removeSelectedState()
                        d3.select(this).classed('highlighted',false);
                    });
            
        });

function highlightSelectedState(state) {
    let filteredFeatures = usaMapData.features.filter(function (feature) {
        return feature.properties.STATEFP20 == state;
    });

    let filteredStates = {
        "name":"SelectedState",
        "type":"FeatureCollection",
        "features":filteredFeatures
    };

    console.log(filteredStates);

    usaProjection = d3.geoAlbersUsa()    
                               .fitSize([stateSvgWidth, stateSvgHeight], filteredStates);
            
    const geoPath = d3.geoPath().projection(usaProjection);

    // how can i made the selected district a different color, using the filter conditional on the district's ID
    usaSvg.selectAll('.selectedstate')
        .data(filteredStates.features)
        .join('path')
        .classed('selectedstate', true)
        .attr('transform',`translate(${usaSvgWidth/4 - 125},${usaSvgHeight/3-125})`)
        .attr('d', geoPath)
}

function removeSelectedState() {
    usaSvg.selectAll('.selectedstate').remove();
}
