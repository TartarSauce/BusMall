// - Need to know how many times a particular image was shown
// - Need to know how many times an image was clicked on
// - Need to get the above data on all 25 images over several focus group participants
// - Clear flow of logic
// - Each image should have the following information attached to it
//   - relative path
//   - name to be used for reporting
//   - number of times clicked - numClicks
//   - number of times shown - numShown
// - Keep an array object to store all images as one unit
// - This happens 25 times - generate a set of three random images, no duplicates
// - Increment the numClicks every time an image makes it to the set
// - Get a handle to the container element on the web page
//   - Populate it with the three images
//   - Add an event listener to the container element on the web page to listen for clicks
//   - Define an event handler for the event
//     - Figure out which image was clicked on
//     - register that information
//     - if still within the 25 set limit, display the next set of three images
//     - if crossed the 25 set limit, stop listening to events on the container element
// - Report to the user that the survey is over
// - Show graphs when that data becomes available

var allNames = ['bag', 'boots', 'chair', 'dragon', 'scissors', 'tauntaun',
                    'usb', 'banana', 'breakfast', 'cthulhu', 'pen', 'shark', 'unicorn',
                    'water-can', 'bathroom', 'bubblegum', 'dog-duck', 'pet-sweep',
                    'sweep', 'wine-glass'];
var allImages = [];

var containerElement = document.getElementById('threeimgset');
var imageElement1 = document.getElementById('img1');
var imageElement2 = document.getElementById('img2');
var imageElement3 = document.getElementById('img3');

// Class definition
function SurveyImage (name) {
  this.path = 'imgs/' + name + '.jpg';
  this.name = name;
  this.numClicks = 0;
  this.numShown = 0;
  allImages.push(this);
};

// create the array of images
for (var i = 0; i < allNames.length; i++) {
  var newImg = new SurveyImage(allNames[i]);
}

// get a random set of 3 indices
var randIndex1 = Math.floor(Math.random() * ((allImages.length - 0)));
var randIndex2 = Math.floor(Math.random() * ((allImages.length - 0)));
while (randIndex1 === randIndex2) {
  var randIndex2 = Math.floor(Math.random() * ((allImages.length - 0)));
}
var randIndex3 = Math.floor(Math.random() * ((allImages.length - 0)));
while ((randIndex1 === randIndex3) || (randIndex2 === randIndex3)) {
  var randIndex3 = Math.floor(Math.random() * ((allImages.length - 0)));
}

// display all images on screen
imageElement1.src = allImages[randIndex1].path;
imageElement2.src = allImages[randIndex2].path;
imageElement3.src = allImages[randIndex3].path;

//console.log(allImages);
console.log(randIndex1, randIndex2, randIndex3);
// Attach event handler to the container holding the images
//containerElement.addEventListener('click', handleClick);

imageElement1.addEventListener('click', handleClick);

// Event handler for the click event
function handleClick(event) {
  console.log(event.target.id);
  var s = document.getElementById(event.target.id);
}
