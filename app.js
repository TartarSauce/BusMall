//---------------------------------
// GLOBAL VARIABLES
//---------------------------------
// handy array of image names
var allNames = ['bag', 'boots', 'chair', 'dragon', 'scissors', 'tauntaun',
                    'usb', 'banana', 'breakfast', 'cthulhu', 'pen', 'shark', 'unicorn',
                    'water-can', 'bathroom', 'bubblegum', 'dog-duck', 'pet-sweep',
                    'sweep', 'wine-glass'];

var allImages = []; // the array that will hold all image objects
var counter25 = 0;  // track how many times the trio of images are shown
var chart = null;   // initialize the chart object

// handle to DOM elements containing images
var imageContainerElement = document.getElementById('threeimgset');
var imageElement1 = document.getElementById('img1');
var imageElement2 = document.getElementById('img2');
var imageElement3 = document.getElementById('img3');
var startButtonElement = document.getElementById('startButton');
var surveyResultsButtonElement = document.getElementById('surveyButton');
var clicksChart = document.getElementById('clicksChart').getContext('2d');
//var clearLSButton = document.getElementById('clearLS');

//---------------------------------
// CLASS DEFINITION
//---------------------------------
function SurveyImage (name) {
  this.path = 'imgs/' + name + '.jpg';
  this.name = name;
  this.numClicks = 0;
  this.numShown = 0;
  allImages.push(this);
};

//---------------------------------
// OTHER SUPPORTING FUNCTIONS, EVENT HANDLERS
//---------------------------------
// display a random set of 3 images
function displayRandomImages() {
  startButtonElement.disabled = true;

  if (chart != null){
    chart.destroy();
  }

  if (counter25 < 25) {
    var randIndex1 = Math.floor(Math.random() * allImages.length);
    var randIndex2 = Math.floor(Math.random() * allImages.length);
    while (randIndex1 === randIndex2) {
      var randIndex2 = Math.floor(Math.random() * allImages.length);
    }
    var randIndex3 = Math.floor(Math.random() * allImages.length);
    while ((randIndex1 === randIndex3) || (randIndex2 === randIndex3)) {
      var randIndex3 = Math.floor(Math.random() * allImages.length);
    }
    // display all images on screen - src and alt updated
    imageElement1.src = allImages[randIndex1].path;
    imageElement2.src = allImages[randIndex2].path;
    imageElement3.src = allImages[randIndex3].path;
    imageElement1.alt = allImages[randIndex1].name;
    imageElement2.alt = allImages[randIndex2].name;
    imageElement3.alt = allImages[randIndex3].name;

    // Attach event handler to the containers holding the images
    imageElement1.addEventListener('click', handleClick);
    imageElement2.addEventListener('click', handleClick);
    imageElement3.addEventListener('click', handleClick);

    // increment numShown on all those images
    allImages[randIndex1].numShown += 1;
    allImages[randIndex2].numShown += 1;
    allImages[randIndex3].numShown += 1;

    counter25++;
  }
  else {
    surveyResultsButtonElement.style.visibility = 'visible';
    alert('Thank you for completing the survey. '
        + 'Click the Show Survey Results button below to see the results of your survey.');
    surveyResultsButtonElement.addEventListener('click', displayStats);
    imageContainerElement.disabled = true;
    imageContainerElement.style.opacity = 0.4;

    // remove event handler to the containers holding the images
    imageElement1.removeEventListener('click', handleClick);
    imageElement2.removeEventListener('click', handleClick);
    imageElement3.removeEventListener('click', handleClick);
  }
}

// Event handler for the click event
function handleClick(event) {
  for (var i = 0; i < allImages.length; i++) {
    if (event.target.alt === allImages[i].name) {
      allImages[i].numClicks += 1;
    }
    // add the click and view data for all images to local storage
    var imgStats = [];
    imgStats.push(allImages[i].numClicks);
    imgStats.push(allImages[i].numShown);
    localStorage.setItem(allImages[i].name, JSON.stringify(imgStats));
  }
  // display next set of images
  displayRandomImages();
}

// show stats to console when done with 25, reset counter25
function displayStats() {
  drawChart();
  counter25 = 0;
  startButtonElement.disabled = false;
  imageContainerElement.disabled = false;
  imageContainerElement.style.opacity = 1;
  surveyResultsButtonElement.style.visibility = 'hidden';
}

//reset the arrays for clicks and views
function resetStats() {
  for (var i = 0; i < allImages.length; i++) {
    allImages[i].numClicks = 0;
    allImages[i].numShown = 0;
  }
}

// drawChart
function drawChart() {
  // retrieve clicks and views from local storage and set up data arrays for chart
  var clicks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var views = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var percents = [];
  for (var i = 0; i < allImages.length; i++) {
    if (localStorage.getItem(allImages[i].name) !== null) {
      var rawdata = JSON.parse(localStorage.getItem(allImages[i].name));
      console.log(rawdata);
      console.log(rawdata[0], rawdata[1]);
      clicks[i] += rawdata[0];
      views[i] += rawdata[1];
    }
  }

  // create data structure for plotting click data
  // this chart will plot both clicks and views on the same canvas
  var data = {
    labels: allNames,
    datasets: [
      { data: clicks,
        label: 'Clicks per Product',
        backgroundColor:'#BE666E',
        hoverBackgroundColor: '#BE666E'
      },
      { data: views,
        label: 'Views per Product',
        backgroundColor:'#ABB49A',
        hoverBackgroundColor: '#ABB49A'
      }
    ]
  };

  // draw the chart, its a stacked chart showing both
  // clicks and views for an image
  chart = new Chart(clicksChart,{
    type: 'bar',
    stacked: true,
    data: data,
    options: {
      responsive: false,
      scales: {
        xAxes: [{stacked: false}],
        yAxes: [{stacked:false}]
      }
    }
  });
}

// event handler for window load action
function loadLocalStorage() {
  for (var i = 0; i < allImages.length; i++) {
    if (localStorage.getItem(allImages[i].name) !== null) {
      var rawdata = JSON.parse(localStorage.getItem(allImages[i].name));
      allImages[i].numClicks = rawdata[0];
      allImages[i].numShown = rawdata[1];
    }
  }
}

function clearLocalStorage() {
  localStorage.clear();
  resetStats();
}

//---------------------------------
// MAIN SECTION OF EXECUTABLE CODE
//---------------------------------
// create the array of images
for (var i = 0; i < allNames.length; i++) {
  var newImg = new SurveyImage(allNames[i]);
}

// hide buttons for survey results
surveyResultsButtonElement.style.visibility = 'hidden';

// Attach event listeners where necessary
window.addEventListener('load', loadLocalStorage);
startButtonElement.addEventListener('click', displayRandomImages);
//clearLSButton.addEventListener('click', clearLocalStorage);
