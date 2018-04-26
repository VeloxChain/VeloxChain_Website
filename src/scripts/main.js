timeline(document.querySelectorAll('.timeline'), {
    forceVerticalMode: 700,
    mode: 'horizontal',
    verticalStartPosition: 'left',
    visibleItems: 4
});

$(document).scroll(function(){
    var scrollCurrent =  $(document).scrollTop();
    if($(window).width() > 767) {
        if (scrollCurrent > 30) {
            $('.navbar-default').addClass('nav-menu');
            $('.navbar-nav').addClass('navbar-nav-fix');
            $('.navbar-brand').addClass('logo-fix');
        } else {
            $('.navbar-default').removeClass('nav-menu');
            $('.navbar-nav').removeClass('navbar-nav-fix');
            $('.navbar-brand').removeClass('logo-fix');
        }
    }
});

$('.navbar-default').addClass('nav-menu');
$('.navbar-nav').addClass('navbar-nav-fix');
$('.navbar-brand').addClass('logo-fix');


// count down

var countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();

var x = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("day").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

}, 1000);