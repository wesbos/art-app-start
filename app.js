// first we create an object to act as a namespace
// namespaces help us keep the global object space clean
// and prevent collisions between variable names
var artApp = {};

artApp.key = 'lgptbPJM';

// we define an init function to kick off our app
// later we will be able to run it with artApp.init();
// vroom vroom
artApp.init = function() {

  // when we submit the form with the class of search
  $('.search').on('submit',function(e){
    // run this code:
    e.preventDefault();
    // grab the value out of the input and store in variable
    var q = $('.q').val();
    console.log("We should search rijks for " + q);
    artApp.getPieces(q);
  });

}

// define a function that will go and get the pieces from the API
// when we want to get pieces, we call artApp.getPieces();
artApp.getPieces = function(q) {
  console.log("We will get " + q);
  // in here we do the ajax request
  $.ajax({
    url : 'https://www.rijksmuseum.nl/api/en/collection/',
    dataType : 'jsonp',
    type : 'GET',
    // in the following data property, we provide all of the params that need to go along with the request.
    // for possible params, visit the docs: http://rijksmuseum.github.io/
    data : {
      key : artApp.key,
      format : 'jsonp',
      q : q
    },
    success : function(result){
      console.log("Success function called");
      // now that the data has come back, let's display it with another function
      artApp.displayPieces(result);
    }
  });
} // end getPieces()

// define a function that will be used to display the pieces in the html
artApp.displayPieces = function(result) {
  // we need to clear out any old artworks to make way for the new ones
  $('#artwork').html('');

  console.log("Ready to display the peices with this data:",result);
  var pieces = result.artObjects;
  // we now have an array of artObjects, we need to loop through each one, and display them
  for(var i = 0; i < pieces.length; i++){
    // console.log(pieces[i]);
    var div = $('<div>').addClass('piece');
    // create an h2 element, and set the text to be the current piece title
    var h2 = $('<h2>').text(pieces[i].title);
    // * create a p with the class of artist and set the text to be the artist
    var p = $('<p>').addClass('artist').text(pieces[i].principalOrFirstMaker);
    // take the div we created, and add the three previously created elements
    div.append(h2,p);
    // check if there is an image first
    if(pieces[i].webImage){
      // * create an image and set the src to be the webimage of the current piece
      var img = $('<img>').attr('src',pieces[i].webImage.url);
      div.append(img);
    }
    // grab the artwork div and append our newly created div
    $('#artwork').append(div);
  } // end for loop
} // end artApp.displayPieces()


$(function() {
  artApp.init();
  artApp.getPieces('dog');
});
