// TITLE FADE OUT
$(window).scroll(function() {
    var st = $(this).scrollTop();
    var bt = $(window).scrollTop() + $(window).height();

    $('.title').each(function(index) {
        // console.log($(this).offset().top-st, st)
        if($(this).offset().top-st < 0) {
            var o = 1 + (($(this).offset().top-st - st) / 1500);
            $(this).css({ 'opacity' : o });
            // console.log(st, ($(this).offset().top-st), o)
        }
        else {
            $(this).css({ 'opacity' : 1});
        }
    })
});

// BACKGROUND FADE IN FADE OUT
var background_scrolly = document.querySelector("#background");
var article = background_scrolly.querySelector("article");
var step = article.querySelectorAll(".background-text");

// initialize the scrollama
var background_scroller = scrollama();

// scrollama event handlers
function background_handleStepEnter(response) {
    // response = { element, direction, index }

    var bg_para = response.element.querySelectorAll(".step")

    bg_para[0].classList.add("bullet-point");
    response.element.classList.add("is-active");
}

function background_handleStepExit(response) {
    // response = { element, direction, index }

    var bg_para = response.element.querySelectorAll(".step")

    bg_para[0].classList.remove("bullet-point");
    response.element.classList.remove("is-active");
}

function background_init() {

    // 1. setup the scroller with the bare-bones options
    // 		this will also initialize trigger observations
    // 2. bind scrollama event handlers (this can be chained like below)
    background_scroller
        .setup({
            step: "#background article .background-text",
            debug: false,
            offset: 0.5
        })
        .onStepEnter(background_handleStepEnter)
        .onStepExit(background_handleStepExit);

}

// kick things off
background_init();


// DISTRICTING-1 FADE IN FADE OUT
var body = d3.select("body")
var d1_scrolly = body.select("#districting-1");
var maricopa = d1_scrolly.select('.maricopa-svg');
var d1_districting = d1_scrolly.select("article");
var d1_districting_step = d1_districting.selectAll(".districting-text");

var d1_scroller = scrollama();

// scrollama event handlers
function d1_handleStepEnter(response) {
    // response = { element, direction, index }
    
    response.element.classList.add("is-active");
    // maricopa.classed('is-active', true);
}

function d1_handleStepExit(response) {
    response.element.classList.remove("is-active");
    // maricopa.classed('is-active', false);
}

function d1_init() {

    // 1. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 2. bind scrollama event handlers (this can be chained like below)
    d1_scroller
        .setup({
            step: "#districting-1 article .districting-text",
            debug: false,
            offset: .5
        })
        .onStepEnter(d1_handleStepEnter)
        .onStepExit(d1_handleStepExit);
}

// kick things off
d1_init();


// DISTRICTING-2 FADE IN FADE OUT
// using d3 for convenience
var body = d3.select("body");
var d2_scrolly = body.select("#districting-2");
var algo = d2_scrolly.select("#algorithm");
var d2_districting = d2_scrolly.select("article");
var d2_districting_text = d2_districting.selectAll(".districting-text");
var figure = d2_scrolly.select(".figure")
var image = document.getElementById('algorithm');
image.src = "";

// initialize the scrollama
var d2_scroller = scrollama();

// generic window resize listener event
function d2_handleResize() {
    // 1. update height of step elements
    // console.log(window.innerHeight, window.outerHeight)
    var stepH = Math.floor(window.outerHeight * 0.375);
    d2_districting_text.style("height", stepH + "px");

    var algoHeight = stepH;
    var algoMarginTop = (window.innerHeight - algoHeight) / 2;

    algo
        .style("height", algoHeight + "px")
        .style("top", algoMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    d2_scroller.resize();
}

var j = 0;

// scrollama event handlers
function d2_handleStepEnter(response) {
    // console.log("entered ", response.index);
    // response = { element, direction, index }

    // add color to current step only
    d2_districting_text.classed("is-active", function (d, i) {
        // console.log("step", i)
        if(i == response.index) {
            j = response.index
        }
        return i === response.index;
        // we can save the value that returns true in this and only remove the class from that value in exit
    });

    let images = ['images/AZ_Shortest.png', 'images/AZ_Olson.png', 'images/AL_Voronoi.png']
    image.src = images[response.index];
    // algo.classed("is-active", true);
    // figure.classed("is-active", true);
    console.log("entering", j, "image", image.src)

    // update graphic based on step
    // figure.select("p").text(response.index + 1);
}

function d2_handleStepExit(response) {
    let image = document.getElementById('algorithm');


    if(response.index == j) {
        d2_districting_text.classed("is-active", false)
    }
    // algo.classed("is-active", function(d, i){
    //     console.log(image.src == 'images/AZ_Olson.png')
    //     if((response.index == 2 || response.index == 0) && image.src == 'images/AZ_Olson.png') {
    //         console.log("middle", image.src)
    //         return true;
    //     }
    //     else if(response.index == 2 || response.index == 0) {
    //         console.log("leaving", image.src)
    //         return false;
    //     }
    //     else {
    //         console.log("leaving olson")
    //         return true;
    //     }
    // })
    // figure.classed("is-active", function(d, i){
    //     if(response.index == 2 || response.index == 0)
    //         return false;
    //     else
    //         return true;
    // })
}

function d2_init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    d2_handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    d2_scroller
        .setup({
            step: "#districting-2 article .districting-text",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(d2_handleStepEnter)
        .onStepExit(d2_handleStepExit)
}

// kick things off
d2_init();

