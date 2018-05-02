// scroll header

$(document).scroll(function(){
  var scrollCurrent =  $(document).scrollTop();
  if($(window).width() > 767) {
    if (scrollCurrent > 30) {
      $('.site-header .navbar-default').addClass('nav-menu');
      $('.navbar-nav').addClass('navbar-nav-fix');
      $('.site-header .navbar-brand').addClass('logo-fix');
    } else {
      $('.site-header .navbar-default').removeClass('nav-menu');
      $('.navbar-nav').removeClass('navbar-nav-fix');
      $('.site-header .navbar-brand').removeClass('logo-fix');
    }
  } else {
    $('.navbar-default').addClass('nav-menu');
    $('.navbar-nav').addClass('navbar-nav-fix');
    $('.navbar-brand').addClass('logo-fix');
  }
});

if($(window).width() < 767) {
  $('.navbar-default').addClass('nav-menu');
  $('.navbar-nav').addClass('navbar-nav-fix');
  $('.navbar-brand').addClass('logo-fix');
}

// scroll menu

var lastId,
topMenu = $(".navbar-default"),
topMenuHeight = topMenu.outerHeight(),

menuItems = topMenu.find("a.menu"),

scrollItems = menuItems.map(function(){
  var item = $($(this).attr("href"));
  if (item.length) { return item; }
});

menuItems.click(function(e){
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
    scrollTop: offsetTop
  }, 1000);
  $('.navbar-collapse').removeClass('in');
  e.preventDefault();
});

$('.navbar-brand').click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
});

// time line

timeline(document.querySelectorAll('.timeline'), {
  forceVerticalMode: 700,
  mode: 'horizontal',
  verticalStartPosition: 'left',
  visibleItems: 3
});

// menu mobile

$(document).click(function (event) {
  if ($(event.target).parents(".navbar-collapse").length < 1) {
    var clickover = $(event.target);
    var $navbar = $(".navbar-collapse");               
    var _opened = $navbar.hasClass("in");
    
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
      $navbar.collapse('hide');
    }
  }
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('.dropdown-item').click(function() {
  $('.dropdown-toggle').val($(this).html());
  $('.dropdown-toggle').html($(this).html());
});