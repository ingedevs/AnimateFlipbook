const url = "docs/01.pdf";

// Set Varible
let pdfDoc = null,
  pageNum = 1,
  weight,
  height;
var turnDisplay;
var scale = 2;
var zoom = 1;

// Set Varible Media Query
const mediaQuery = window.matchMedia("(min-width: 768px)");
// Check if the media query is true
if (mediaQuery.matches) {
  // Then trigger an alert
  turnDisplay = "double";
  weight = 1500;
  height = 910;
} else {
  turnDisplay = "single";
  weight = 400;
  height = 580;
}

// Render the page
function renderPage(num, hoja) {
  // Get page
  pdfDoc.getPage(num).then(function (page) {
    // Set scale
    var viewport = page.getViewport({ scale });
    hoja.height = viewport.height;
    hoja.width = viewport.width;
    var renderCtx = {
      canvasContext: hoja.getContext("2d"),
      viewport: viewport,
    };
    page.render(renderCtx);
  });
}

// Get Document
pdfjsLib.getDocument(url).promise.then((pdfDoc_) => {
  pdfDoc = pdfDoc_;
  np = pdfDoc.numPages;
  for (var i = 1; i <= np; i++) {
    $(".book").html(
      $(".book").html() +
        '<div><canvas id="hoja' +
        i +
        '"style="border: 1px solid white; width: 99.4%; height: 99.5%;"</canvas></div>'
    );
  }
  for (var i = 1; i <= np; i++) {
    renderPage(i, document.querySelector("#hoja" + i));
  }
  turn();
});

// Buttons Event
document.querySelector("#prev-page").addEventListener("click", function () {
  $(".book").turn("previous");
});
document.querySelector("#next-page").addEventListener("click", function () {
  $(".book").turn("next");
});
document.querySelector(".home").addEventListener("click", function () {
  $("#book").turn("page", 1);
});
document.querySelector(".zoomIn").addEventListener("click", function () {
  $("#book").turn("zoom", (zoom -= 0.1));
});
document.querySelector(".zoomOut").addEventListener("click", function () {
  $("#book").turn("zoom", (zoom += 0.1));
});
document.querySelector(".zoomNormal").addEventListener("click", function () {
  $("#book").turn("zoom", (zoom = 1));
});

// Function Animate Book
function turn() {
  $("#book").turn({
    display: "" + turnDisplay,
    acceleration: true,
    gradients: !$.isTouch,
    elevation: 50,
    duration: 1000,
    autoCenter: false,
  });
  $("#book").turn("size", weight, height);
}
