var APP = APP || {};

APP.PhotoTagging = (function(){

  var init = function() {
    loadTags();
    setListeners();
  }

  var getDelete = function(id) {
    $delete = $('<div>').addClass('delete').text('X').attr("data-id", id)
    return ($delete);
  }

  var loadTags = function() {
    $.ajax({
      method: "GET",
      url: 'tags',
      dataType: 'json',
      success: function(data) { renderTags(data) }
    });
  }

  var renderTags = function(data) {
    data.forEach(function(tag) {
      $tag = $('<div></div>').addClass('tag').text(tag.value);
      $tag.offset({top: tag.top, left: tag.left});
      $tag.append(getDelete(tag.id));
      $('.img-container').append($tag);
    });
  }

  var setListeners = function() {
    $('.img-container').on('click', 'img', function(e) {
      // remove any existing target boxes
      $('.target').remove();

      // create target box + dropdown slide
      getTargetingBox(e);   
    });

    // selecting tag creates new tag
    $('.img-container').on('click', '.option', function(e) {
      setTag(e.target);
    });

    // showing tags when hovering over image
    $('.img-container').mouseenter( function(e) {
      $('.tag').show();
    } );

    // hiding tags when leaving image
    $('.img-container').mouseleave( function(e) {
      $('.tag').hide();
    });

    // ??? correct delegation
    $( document ).on('click', '.delete', function(e) {
      deleteTag(e.target);
    });
  }

  var deleteTag = function(target) {
    var id = $(target).attr('data-id');
    var tag = $(target).parent();
    $.ajax({
      method: 'DELETE',
      url: 'tags/' + id + '.json',
      success: function() { tag.remove() },
      error: function(error) {console.log(error)}
    });
  }

  var setTag = function(target) {
    var value = $(target).text();
    var offset = $('.target').offset();
    saveTag(value, offset);
    $('.target').addClass('tag').removeClass('target').text(value);
  }

  var saveTag = function(value, offset) {
    var tag = {
      value: value,
      top: offset.top,
      left: offset.left
    }

    $.ajax({
      url: 'tags',
      method: 'POST',
      data: { tag },
      dataType: 'json',
      success: function(data) { renderNewTag(data) },
      error: function() {console.log('error')},
    });
  }

  var renderNewTag = function(data) {
    $('.target').addClass('tag text-center').removeClass('target').text(data.vaue);
    $delete = getDelete(data.id);
    $('.tag').append($delete);
  }

  var getTargetingBox = function(e) {
    $target = getTarget();
    $target.offset({ left: e.pageX - 30, top: e.pageY - 10 });
    $('.img-container').append($target);
    $('.dropdown').slideDown();
  }

  var getTarget = function() {
    $target = $('<div></div>').addClass('target');
    $dropdown = $('<div></div>').addClass('dropdown');
    $dropdown.append(
      $("<div>").text("WALDO").addClass("option text-center"),
      $("<div>").text("WENDY").addClass("option text-center"),
      $("<div>").text("ODLAW").addClass("option text-center"),
      $("<div>").text("WIZARD").addClass("option text-center"),
      $("<div>").text("WOOF").addClass("option text-center")  );
    $target.append($dropdown);
    return $target;
  }


  return {
    init: init
  }

})();


$( document ).ready( function() {
  APP.PhotoTagging.init();
} );