#Goals
##focus group participant/user
  - The user interface needs to be clean
  - The task on hand should be clearly described to the user with easy to follow directions
  - The flow of the survey should be intuitive to the user once the directions are provided
  - Appropriate feedback should be provided when necessary to ensure that the user does not stray from the task
  - will be nice to tell the user how many more sets to go
  - Report to the user when done with the survey

##marketing research team
  - Need to know how many times a particular image was shown
  - Need to know how many times an image was clicked on
  - Need to get the above data on all 25 images over several focus group participants

##developer
  - Clear flow of logic
  - Each image should have the following information attached to it
    - relative path
    - name to be used for reporting
    - number of times clicked - numClicks
    - number of times shown - numShown
  - Keep an array object to store all images as one unit
  - This happens 25 times - generate a set of three random images, no duplicates
  - Increment the numClicks every time an image makes it to the set
  - Get a handle to the container element on the web page
    - Populate it with the three images
    - Add an event listener to the container element on the web page to listen for clicks
    - Define an event handler for the event
      - Figure out which image was clicked on
      - register that information
      - if still within the 25 set limit, display the next set of three images
      - if crossed the 25 set limit, stop listening to events on the container element
  - Report to the user that the survey is over
  - Show graphs when that data becomes available
