(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/aibui/Project/BikeCoinWebsite/src/scripts/main.js":[function(require,module,exports){
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
},{}]},{},["/home/aibui/Project/BikeCoinWebsite/src/scripts/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInRpbWVsaW5lKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW1lbGluZScpLCB7XG4gICAgZm9yY2VWZXJ0aWNhbE1vZGU6IDcwMCxcbiAgICBtb2RlOiAnaG9yaXpvbnRhbCcsXG4gICAgdmVydGljYWxTdGFydFBvc2l0aW9uOiAnbGVmdCcsXG4gICAgdmlzaWJsZUl0ZW1zOiA0XG59KTtcblxuJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHNjcm9sbEN1cnJlbnQgPSAgJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XG4gICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjcpIHtcbiAgICAgICAgaWYgKHNjcm9sbEN1cnJlbnQgPiAzMCkge1xuICAgICAgICAgICAgJCgnLm5hdmJhci1kZWZhdWx0JykuYWRkQ2xhc3MoJ25hdi1tZW51Jyk7XG4gICAgICAgICAgICAkKCcubmF2YmFyLW5hdicpLmFkZENsYXNzKCduYXZiYXItbmF2LWZpeCcpO1xuICAgICAgICAgICAgJCgnLm5hdmJhci1icmFuZCcpLmFkZENsYXNzKCdsb2dvLWZpeCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLm5hdmJhci1kZWZhdWx0JykucmVtb3ZlQ2xhc3MoJ25hdi1tZW51Jyk7XG4gICAgICAgICAgICAkKCcubmF2YmFyLW5hdicpLnJlbW92ZUNsYXNzKCduYXZiYXItbmF2LWZpeCcpO1xuICAgICAgICAgICAgJCgnLm5hdmJhci1icmFuZCcpLnJlbW92ZUNsYXNzKCdsb2dvLWZpeCcpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbiQoJy5uYXZiYXItZGVmYXVsdCcpLmFkZENsYXNzKCduYXYtbWVudScpO1xuJCgnLm5hdmJhci1uYXYnKS5hZGRDbGFzcygnbmF2YmFyLW5hdi1maXgnKTtcbiQoJy5uYXZiYXItYnJhbmQnKS5hZGRDbGFzcygnbG9nby1maXgnKTtcblxuXG4vLyBjb3VudCBkb3duXG5cbnZhciBjb3VudERvd25EYXRlID0gbmV3IERhdGUoXCJTZXAgNSwgMjAxOCAxNTozNzoyNVwiKS5nZXRUaW1lKCk7XG5cbnZhciB4ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIHZhciBkaXN0YW5jZSA9IGNvdW50RG93bkRhdGUgLSBub3c7XG5cbiAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcbiAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSk7XG4gIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKTtcbiAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF5XCIpLmlubmVySFRNTCA9IGRheXM7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cnNcIikuaW5uZXJIVE1MID0gaG91cnM7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWludXRlc1wiKS5pbm5lckhUTUwgPSBtaW51dGVzO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY29uZHNcIikuaW5uZXJIVE1MID0gc2Vjb25kcztcblxufSwgMTAwMCk7Il19
