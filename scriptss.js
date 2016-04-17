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

    // Search Button clicked
    $('#searchInput').keyup(function(e){
        var q = $(this).val();
        if(q.length <= 2)
            return 0
        $.get('https://packagist.org/search.json?q='+q).done(function(data){
            $('.error').addClass('hidden')
            $('#brand-title').html(" Search Results...")
            $('.no-content').hide()
            if(data.total == 0)
            {
                $('.error').removeClass('hidden')
                $('.blog-masonry-container').html('')

            }
            $('.blog-masonry-container').html(prepareSnippets(data))
        }).fail(function (data) {
            $('.error').removeClass('hidden')
            $('.blog-masonry-container').html('')
            })
    })

    // submit pressed on search listings
    $(document).on('click','.link-text',function(){
        var modal = $("#submitModal");
        modal.find("#name").val($(this).parent().find('span.repo').html())
        modal.find('.modal-footer').show()
        $('#modalError').addClass('hidden')
        $('#modalSuccess').addClass('hidden')


    });

    // submit form
    $('#modalSubmit').click(function(){
        var vm = $('#submitModal')
        $('#modalError').addClass('hidden')
        $('#modalSuccess').addClass('hidden')
        var data = {
            name : vm.find("#name").val(),
            first_name : vm.find("#first_name").val(),
            email: vm.find("#email").val(),
            category_id: vm.find("#category_id").val()
        };
        $.post('http://internal-api.laragist.org/v1/submit',data).done(function(response){

            var  success = $('#modalSuccess');
            success.html("Successfully submitted!");
            sucess.removeClass('hidden');
            var vm = $('#submitModal');
            vm.find('.modal-footer').hide();
            vm.find('form').hide();

        }).error(function (data) {
           var  error = $('#modalError')
            if(data.status >= 500)
            error.html("Some error occurred! Please try again later.");
            else
                error.html(data.responseJSON.message);
            error.removeClass('hidden')
        })
    })

   
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


function prepareSnippets(data){
    var string = '<div class="col-md-4 col-sm-6 blog-masonry-item Tech" ><div class="item-inner quote-post"><div class="post-title"><span class="hidden repo">{{repo}}</span><h1 style="margin-bottom: 20px;">{{name}}</h1> <h4 style="margin-bottom: 20px;">{{meta}}<p><br></p></h4><div class="post-meta"> <span class="sub alt-font">Downloads: {{total}}</span></div><a href="#" class="link-text" data-toggle="modal" data-target="#submitModal" >Submit</a></div></div></div>'
    var final = ""
    $.each(data.results,function(index,value){
        string = string.replace('{{name}}',value.name);
        string = string.replace('{{meta}}',value.description);
        string = string.replace('{{total}}',value.downloads);
        string = string.replace('{{repo}}',value.name);
        final += string;
        string = '<div class="col-md-4 col-sm-6 blog-masonry-item Tech" ><div class="item-inner quote-post"><div class="post-title"><span class="hidden repo">{{repo}}</span><h1 style="margin-bottom: 20px;">{{name}}</h1> <h4 style="margin-bottom: 20px;">{{meta}}<p><br></p></h4><div class="post-meta"> <span class="sub alt-font">Downloads: {{total}}</span></div><a href="#" class="link-text" data-toggle="modal" data-target="#submitModal" >Submit</a></div></div></div>'

    })

    return final;
}


function prepareSnippetsIndex(data){
    var string = '<div class="col-md-4 col-sm-6 blog-masonry-item Tech" ><div class="item-inner quote-post"><div class="post-title"><span class="hidden repo">{{repo}}</span><h1 style="margin-bottom: 20px;">{{name}}</h1> <h4 style="margin-bottom: 20px;">{{meta}}<p><br></p></h4><div class="post-meta"> <span class="sub alt-font">Downloads: {{total}}</span></div><a href="{{readmore}}" class="link-text" data-toggle="modal" data-target="#submitModal" >Read More</a></div></div></div>'
    var final = ""
    $.each(data.data,function(index,value){
        string = string.replace('{{name}}',value.name);
        string = string.replace('{{meta}}',value.description);
        string = string.replace('{{total}}',value.downloads_total);
        string = string.replace('{{repo}}',value.name);
        final += string;
        string = '<div class="col-md-4 col-sm-6 blog-masonry-item Tech" ><div class="item-inner quote-post"><div class="post-title"><span class="hidden repo">{{repo}}</span><h1 style="margin-bottom: 20px;">{{name}}</h1> <h4 style="margin-bottom: 20px;">{{meta}}<p><br></p></h4><div class="post-meta"> <span class="sub alt-font">Downloads: {{total}}</span></div><a href="{{readmore}}" class="link-text">Read More</a></div></div></div>'

    })

    return final;
}


function init(){
    $.get('http://internal-api.laragist.org/v1/').done(function (data) {
        $('.blog-masonry-container').html(prepareSnippetsIndex(data))
    })
}
