var APP = APP || {};

APP.Game = (function() {

  var init = function() {
    newGame();
    bestTime();
  }

  var gameScore, gameId;

  var bestTime = function() {
    $.ajax({
      method: "GET",
      url: 'games',
      dataType: 'json',
      success: function(game) { renderBestScore(game)}
    })
  }

  var renderBestScore = function(game) {
    var user = game.username
    var duration = game.difference
    $('.best').text('Best Time: ' + duration + ' seconds by ' + user)
  }

  // var loadTags = function() {
  //   $.ajax({
  //     method: "GET",
  //     url: 'tags',
  //     dataType: 'json',
  //     success: function(data) { renderTags(data) }
  //   });
  // }
  
  var newGame = function() {
    score = 5;
    $.ajax({
      method: "POST",
      url: 'games.json',
      data: { game: { ongoing: true }},
      dataType: 'json',
      success: function(data) { 
        gameId = data.id;
        renderScore() },
    }); 
  }

  var decreaseScore = function() {
    score--;
    renderScore();
    checkGameOver();
  }

  var renderScore = function() {
    $('.current-score').text(score + ' Characters Left');
  }

  var checkGameOver = function() {
    console.log(score)
    if (score === 0) {
      finishGame();
      $('.current-score').addClass('over');
    }
  }

  var finishGame = function() {
    var name = prompt("Thanks for playing! What's your name?");
    if (!name) { name = "anonymous" };
    $.ajax({
      method: "PUT",
      url: 'games/' + gameId + '.json',
      dataType: 'json',
      data: { id: gameId, game: { finish_time: new Date(), ongoing: false, username: name } },
      success: function() { $( '.img-container' ).off() }
    })
  }

  return {
    init: init,
    decreaseScore: decreaseScore
  }

})();