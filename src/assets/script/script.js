// $(document).ready(function(){
//   $('.category-item').click(function(){
//     $(this).siblings('.sub-category').slideToggle();
//     $(this).parent().toggleClass('item-active');
//   })
// })

//-- Responsive Navigation Bar--------------------

// $(document).ready(function(){
// 	$('.close-icon-btn').click(function(){
// 		$('.header-bottom').css('left','-1000px');
//     $('.over-lay-box').css({'width':'0px','opacity':'0'});
// 	});
//   $('.over-lay-box').click(function(){
//     $('.header-bottom').css('left','-1000px');
//     $('.over-lay-box').css('width','0px');
//   })
// 	$('.res-nav-btn').click(function(){
// 		$('.header-bottom').css('left','0px');
//     $('.over-lay-box').css({'width':'100%','opacity':'1'});
// 	})
// });

$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

$(window).resize(function() {
  var width = $(window).width();
  if (width > 992){
    $('.header-bottom').css('left', '0px');
  }else{
    $('.header-bottom').css('left', '-1000px');
  }
});

$(document).on('click', '.close-icon-btn', function () {
  $('.header-bottom').css('left', '-1000px');
  $('.over-lay-box').css({ 'display': 'none', 'opacity': '0' });
})
$(document).on('click', '.over-lay-box', function () {
  $('.header-bottom').css('left', '-1000px');
  $('.over-lay-box').css('display', 'none');
  $('.dashboard-menu').removeClass('show');
})

$(document).on('click', '.res-nav-btn', function () {
  $('.header-bottom').css('left', '0px');
  $('.over-lay-box').css({ 'display': 'block', 'opacity': '1' });
})



// $(document).ready(function(){
//   var currentSreenSize = $( window ).width();
//   if(currentSreenSize < 992){
//     $('.nav-list').click(function(){
//       $('.active').not(this).removeClass('active');
//       $(this).toggleClass('active');
//     })
//   }
// })



//------------- Responsive Navigation Bar End---------------


$(document).on('click', '.cart-widget', function () {
  $(this).toggleClass('showcart');
})



//------------- Home Page Products new arrivals Navigation Bar End---------------
$(document).ready(function () {
  $(".slick-slider").slick({
    slidesToShow: 3,
    infinite: false,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: '<i class="bi bi-chevron-double-right slick-next slick-nav"></i>',
    prevArrow: '<i class="bi bi-chevron-double-left slick-prev slick-nav"></i>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });


  // Kada Collections Slider -------------
  $(".kada-collections").slick({
    slidesToShow: 5,
    infinite: false,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: '<i class="bi bi-chevron-double-right slick-next slick-nav"></i>',
    prevArrow: '<i class="bi bi-chevron-double-left slick-prev slick-nav"></i>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 486,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });


  // Testimonials ---------------          
  $(".testimonials-box").slick({
    slidesToShow: 1,
    infinite: false,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: '<i class="bi bi-chevron-double-right slick-next slick-nav"></i>',
    prevArrow: '<i class="bi bi-chevron-double-left slick-prev slick-nav"></i>',
  });

});

//************** Backto top Function**************//

let mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.transform = "scale(1)";
    mybutton.style.opacity = "1";
  } else {
    mybutton.style.transform = "scale(0)";
    mybutton.style.opacity = "0";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



/*-----------Sticky Header-------*/

// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('header').outerHeight();


// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 150);

// function hasScrolled() {
//     var st = $(this).scrollTop();


//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;
//     if (st > lastScrollTop && st > navbarHeight){
//          Scroll Down
//         $('header').removeClass('nav-up').addClass('nav-down');
//     } else {
//          Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-down').addClass('nav-up');
//         }
//     }

//     lastScrollTop = st;
// }



$(document).ready(function () {
  $(function ($) {
    $(".mobile_btn").on("click", function () {
      $(".main_menu").slideToggle();
      $(".mobile_btn i").toggleClass("fa-xmark fa-xl");
    });

    if ($(window).width() < 992) {
      $(".main_menu  ul li a").on("click", function () {
        $(this)
          .parent(".has_dropdown")
          .children(".sub_menu")
          .css({ "padding-left": "15px" })
          .stop()
          .slideToggle();

        $(this)
          .parent(".has_dropdown")
          .children("a")
          .find(".fa-angle-right")
          .stop()
          .toggleClass("fa-rotate-90");
      });
    }
  });
})

/*---Uncomment this code if you need toggle filter options---*/
// $(document).ready(function(){
//   $('.filter-title').click(function(){
//     $(this).next().slideToggle();
//   })
// })



/*---------------Category Page filter bar toggle in left side------*/
$(document).ready(function () {
  $('.only-for-responsive').click(function () {
    $('.filter-side-bar').css('left', '0px');
  })
  $('.close-filter').click(function () {
    $('.filter-side-bar').css('left', '-1000px');
  })
})






/*--------------Product Magnigy image Script-------------*/

var currentSreenSize2 = $(window).width();

var App = (function () {

  //=== Use Strict ===//
  'use strict';

  //=== Private Variables ===//

  var gallery = $('#js-gallery');
  if (currentSreenSize2 > 768) {
    $('.gallery__hero').zoom();
  }


  //=== Gallery Object ===//
  var Gallery = {
    zoom: function (imgContainer, img) {

      var containerHeight = imgContainer.outerHeight(),
        src = img.attr('src');

    },
    switch: function (trigger, imgContainer) {
      var src = trigger.attr('href'),
        thumbs = trigger.siblings(),
        img = trigger.parent().prev().children();

      // Add active class to thumb
      trigger.addClass('is-active');

      // Remove active class from thumbs
      thumbs.each(function () {
        if ($(this).hasClass('is-active')) {
          $(this).removeClass('is-active');
        }
      });


      // Switch image source
      img.attr('src', src);
    }
  };

  //=== Public Methods ===//
  function init() {


    // Listen for clicks on anchors within gallery
    gallery.delegate('a', 'click', function (event) {
      var trigger = $(this);
      var triggerData = trigger.data("gallery");

      if (triggerData === 'zoom') {
        var imgContainer = trigger.parent(),
          img = trigger.siblings();
        Gallery.zoom(imgContainer, img);
      } else if (triggerData === 'thumb') {
        var imgContainer = trigger.parent().siblings();
        Gallery.switch(trigger, imgContainer);
      } else {
        return;
      }

      event.preventDefault();
    });
  }

  //=== Make Methods Public ===//
  return {
    init: init
  };

})();

App.init();

/*--------------Product Magnigy image Script End-------------*/


/*-------------Product Image Popup open-----------------*/
$(function () {
  "use strict";

  $(".gallery__hero img").click(function () {
    var $src = $(".gallery__hero img").attr("src");
    $(".img-pop.show").fadeIn();
    $(".img-show img").attr("src", $src);
  });

  $("span, .overlay").click(function () {
    $(".img-pop.show").fadeOut();
  });

});


/*--------------(Open Relative options according to polished)-----------*/
$(document).ready(function () {
  $('input.att-chk[type="checkbox"]').click(function () {
    var inputValue = $(this).attr("value");
    $("." + inputValue).toggle();
  });
});


/*-----------------(quantity input)----------------*/

$(document).ready(function () {
  $('.quantity > .minus').on('click', function () {
    let currentValue = parseInt($('.input-box').val())
    if (currentValue > 1) {
      $('.input-box').val(currentValue - 1);
    }
  })

  $('.quantity > .plus').on('click', function () {
    let currentValue = parseInt($('.input-box').val())
    $('.input-box').val(currentValue + 1);
  })
})



/*-------------dashboard Profile -------------*/
$(document).ready(function () {

  $('.open-edit-form').click(function () {
    $('.edit-form').removeClass('d-none');
    $('.detail-box').addClass('d-none');
  })
  $('.close-edit-form').click(function () {
    $('.edit-form').addClass('d-none');
    $('.detail-box').removeClass('d-none');
  })
})

$(document).ready(function () {
  $('.nav-pills-custom > .nav-link').click(function () {
    $('.nav-pills-custom-dropdown > .nav-link').removeClass('active');
  })
})

$(document).ready(function () {
  $('.nav-pills-custom >.nav-link').click(function () {
    $(this).find(".tab-dropdown").slideDown();
    $(this).siblings().find(".tab-dropdown").slideUp();
  })

})

// $(document).ready(function(){
//   $('.dashboard-menu-icon').click(function(){
//     $('.dashboard-menu').addClass('show');
//   })
// })

$(document).on('click', '.dashboard-menu-icon', function () {
  $('.dashboard-menu').toggleClass('show');
  $('.dashboard-menu').css('display', 'block');
  $('.over-lay-box').css({ "opacity": "1", "display": "block" });
})

$(document).ready(function () {
  $('.nav-pills-custom-dropdown > .nav-link, .no-dropdown-item').click(function () {
    $('.dashboard-menu').removeClass('show');
  })
})

document.getElementById('product-search-icon').addEventListener('click', function () {
  document.getElementById('product-search-bar').classList.toggle('show')
})

