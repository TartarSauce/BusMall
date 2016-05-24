//---------------------------------
// GLOBAL VARIABLES
//---------------------------------
// handy array of image names
var allNames = ['bag', 'boots', 'chair', 'dragon', 'scissors', 'tauntaun',
                    'usb', 'banana', 'breakfast', 'cthulhu', 'pen', 'shark', 'unicorn',
                    'water-can', 'bathroom', 'bubblegum', 'dog-duck', 'pet-sweep',
                    'sweep', 'wine-glass'];

// the array that will hold all image objects
var allImages = [];
var clicks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// track how many times the trio of images are shown
var counter25 = 0;

// handle to DOM elements containing images
var imageElement1 = document.getElementById('img1');
var imageElement2 = document.getElementById('img2');
var imageElement3 = document.getElementById('img3');

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
// PROTOTYPE FUNCTIONS
//---------------------------------
// update the number of clicks
SurveyImage.prototype.updateClicks = function() {
  this.numClicks++;
};

// update the number of times the image is shown to user
SurveyImage.prototype.updateShown = function() {
  this.numShown++;
};

// retrieve the image name
SurveyImage.prototype.getName = function() {
  return this.name;
};

//---------------------------------
// OTHER SUPPORTING FUNCTIONS, EVENT HANDLERS
//---------------------------------
// display a random set of 3 images
function displayRandomImages() {
  counter25++;  // track counter to 25

  if (counter25 < 26) {
    var randIndex1 = Math.floor(Math.random() * (allImages.length - 0));
    var randIndex2 = Math.floor(Math.random() * (allImages.length - 0));
    while (randIndex1 === randIndex2) {
      var randIndex2 = Math.floor(Math.random() * (allImages.length - 0));
    }
    var randIndex3 = Math.floor(Math.random() * (allImages.length - 0));
    while ((randIndex1 === randIndex3) || (randIndex2 === randIndex3)) {
      var randIndex3 = Math.floor(Math.random() * (allImages.length - 0));
    }
    console.log(randIndex1, randIndex2, randIndex3);

    // display all images on screen
    imageElement1.src = allImages[randIndex1].path;
    imageElement2.src = allImages[randIndex2].path;
    imageElement3.src = allImages[randIndex3].path;

    // increment numShown on all those images
    allImages[randIndex1].updateShown();
    allImages[randIndex2].updateShown();
    allImages[randIndex3].updateShown();
  } else {
    displayStats();
  }
}

// show stats to console when done with 25, reset counter25
function displayStats() {
  for (var i = 0; i < allImages.length; i++) {
    console.log(allImages[i].name + ' had numClicks ' + allImages[i].numClicks
    + ' and numShown ' + allImages[i].numShown);
  }
  drawChart();
  counter25 = 0;
}

// Event handler for the click event
function handleClick(event) {
  // get the image element that was clicked on
  var clickedElement = document.getElementById(event.target.id);

  // get the path attached to the image element, split the string
  var pathArray = ((clickedElement.src).split('/'));

  // get the last element which is the name of the jpg file
  var length = pathArray.length;

  // remove the .jpg suffix to get only the name
  var imgName = pathArray[length - 1].split('.');
  console.log(imgName[0]);

  // loop through the image array, find image object corresponding
  // to the one user clicked on, and increment click count
  for (var i = 0; i < allImages.length; i++) {
    if (imgName[0] === allImages[i].getName()) {
      var clickIndex = i;
      allImages[i].updateClicks();
      clicks[i] += allImages[i].numClicks;
    }
  }

  // display next set of images
  displayRandomImages();
}

// create data structure
var data = {
  labels: allNames,
  datasets: [
    {
      data: clicks,
      label: 'Clicks per Product',
      backgroundColor:'darkseagreen',
      hoverBackgroundColor: 'blue'
    }
  ]
};

// drawChart
function drawChart() {
  var clicksChart = document.getElementById('clicksChart').getContext('2d');
  songChart = new Chart(clicksChart,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    }
  });
  chartDrawn = true;
}

//---------------------------------
// MAIN SECTION OF EXECUTABLE CODE
//---------------------------------
// create the array of images
for (var i = 0; i < allNames.length; i++) {
  var newImg = new SurveyImage(allNames[i]);
}

// display the first set of random images
displayRandomImages();

// Attach event handler to the containers holding the images
imageElement1.addEventListener('click', handleClick);
imageElement2.addEventListener('click', handleClick);
imageElement3.addEventListener('click', handleClick);
