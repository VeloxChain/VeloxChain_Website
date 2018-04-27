timeline(document.querySelectorAll('.timeline'), {
    forceVerticalMode: 700,
    mode: 'horizontal',
    verticalStartPosition: 'left',
    visibleItems: 4
});

// scroll header

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