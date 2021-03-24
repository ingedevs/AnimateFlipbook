const url = "docs/01.pdf";

let pdfDoc = null,
    pageNum = 1,
    weight = 1000,
    height = 680;

var scale = 1;

// Render the page
function renderPage(num,hoja) {
    
    // Get page
    pdfDoc.getPage(num).then(function(page) {
        // Set scale
        
        var viewport = page.getViewport({ scale });
        hoja.height = viewport.height;
        hoja.width = viewport.width;
        
        var renderCtx = {
            canvasContext: hoja.getContext('2d'),
            viewport: viewport
        }
        page.render(renderCtx);

    });
} //*/




// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    
    np = pdfDoc.numPages;
    
    for (var i = 1; i <= np; i++) {
        $(".book").html($(".book").html() + '<div><canvas id="hoja' + i + '"style="border: 1px solid white; width: 99.4%; height: 99.5%;"</canvas></div>');
        
    }
    

    for (var i = 1; i <= np; i++) {
        renderPage(i, document.querySelector('#hoja' + i));
    }

    turn();
    
});

// Buttons Event
document.querySelector('#prev-page').addEventListener('click', function () {
        $('.book').turn('previous');
});
document.querySelector('#next-page').addEventListener('click', function () {
        $('.book').turn('next');
});

    
function turn() {
    $('#book').turn({
        display: 'double',
        acceleration: true,
        gradients: !$.isTouch,
        elevation: 50,
        duration: 1000,
        autoCenter: false,
    });

    $("#book").turn("size", weight, height);
};

    

    
