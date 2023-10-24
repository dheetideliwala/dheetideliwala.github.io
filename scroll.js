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
var scroller = scrollama();

// scrollama event handlers
function background_handleStepEnter(response) {
    // response = { element, direction, index }

    var para = response.element.querySelectorAll(".step")

    para[0].classList.add("bullet-point");
    response.element.classList.add("is-active");
}

function background_handleStepExit(response) {
    // response = { element, direction, index }

    var para = response.element.querySelectorAll(".step")

    para[0].classList.remove("bullet-point");
    response.element.classList.remove("is-active");
}

function background_init() {

    // 1. setup the scroller with the bare-bones options
    // 		this will also initialize trigger observations
    // 2. bind scrollama event handlers (this can be chained like below)
    scroller
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
