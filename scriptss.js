$(document).ready(function(){

    "use strict";
    
    // Nav Sticky
    
    $(window).scroll(function(){
        if($(window).scrollTop() > 500 && !$('.mobile-toggle').is(":visible")){
            $('.top-bar').addClass('nav-sticky');
        }else{
            $('.top-bar').removeClass('nav-sticky');
        }
    });
    
    // Offscreen Nav
    
    $('.offscreen-toggle').click(function(){
        $('.main-container').toggleClass('reveal-nav');
        $('.offscreen-container').toggleClass('reveal-nav');
        $('.offscreen-menu .container').toggleClass('reveal-nav');
    });
    
    $('.main-container').click(function(){
        if($(this).hasClass('reveal-nav')){
            $('.main-container').toggleClass('reveal-nav');
            $('.offscreen-container').toggleClass('reveal-nav');
            $('.offscreen-menu .container').toggleClass('reveal-nav');
        }
    });
    
    // Detect logo dimensions and add correct class
    
    var logoImage = $('.top-bar .logo:first-of-type');
    
    var theImage = new Image();
    theImage.src = logoImage.attr("src");
    
    var logoWidth = theImage.width;
    var logoHeight = theImage.height;
    var logoRatio = logoWidth / logoHeight;
    
    if(logoRatio > 2.8){
        $('.top-bar .logo').addClass('logo-wide');
    }
    
    if(logoRatio < 2){
        $('.top-bar .logo').addClass('logo-square');
    }
    
    
    // Margin first section for top bar
    
    if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
        $('.main-container').first().css('margin-top', $('nav').outerHeight());
    }
    
    $(window).resize(function(){
        if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
            $('.main-container').first().css('margin-top', $('nav').outerHeight());
        }
    });
    
    // Pad first section for overlay bar
    
    if($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar') ){
        var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
        var newPad = currentPad + $('nav').outerHeight() - 48;
        if(currentPad > 0){
            $('.main-container').children(':first').css('padding-top', newPad);
        }else if($('.main-container').find(':first').hasClass('hero-slider')){
            var height = parseInt($('.hero-slider .slides li:first-child').outerHeight());
            var newHeight = height + $('nav').outerHeight();
            $('.hero-slider .slides li').css('height', newHeight);
        }
    }
    
    
   
});
$(window).load(function(){

  "use strict";
    
  
    // Align Elements Vertically
    
    alignVertical();
    alignBottom();
    
    $(window).resize(function(){
        alignVertical();
        alignBottom();
    });
    
    // Isotope Projects
    
    $('.projects-container').isotope({
      itemSelector: '.project',
      layoutMode: 'fitRows'
    });
    
    $('.filters li').click(function() {
      var current = $(this);
      
      current.siblings('li').removeClass('active');
      current.addClass('active');
      
      var filterValue = current.attr('data-filter');
      var container = current.closest('.projects-wrapper').find('.projects-container');
      container.isotope({ filter: filterValue });
    });
    
    // Isotope contained feature boxes
    
    $('.contained-features-wrapper').isotope({
      itemSelector: '.no-pad',
      layoutMode: 'masonry',
      masonry: {
          gutter: 0
        }
    });
    
    
    // Remove Loader
    
    $('.loader').css('opacity', 0);
    setTimeout(function(){$('.loader').hide();}, 600);
    
    // Blog Masonry
    
    $('.blog-masonry-container').isotope({
      itemSelector: '.blog-masonry-item',
      layoutMode: 'masonry'
    });
    
    $('.blog-filters li').click(function() {
      var current = $(this);
      
      current.siblings('li').removeClass('active');
      current.addClass('active');
      
      var filterValue = current.attr('data-filter');
      var container = current.closest('.blog-masonry').find('.blog-masonry-container');
      container.isotope({ filter: filterValue });
    });



});


function alignVertical(){

        $('.align-vertical').each(function(){
            var that = $(this);
            var height = that.height();
            var parentHeight = that.parent().height();
            var padAmount = (parentHeight / 2) - (height/2);
            that.css('padding-top', padAmount);
        });
    
}

function alignBottom(){
    $('.align-bottom').each(function(){
        var that = $(this);
        var height = that.height();
        var parentHeight = that.parent().height();
        var padAmount = (parentHeight) - (height) - 32;
        that.css('padding-top', padAmount);
    });
}

