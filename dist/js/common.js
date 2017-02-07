'use strict';
if(!window.console) window.console = {};
if(!window.console.memory) window.console.memory = function() {};
if(!window.console.debug) window.console.debug = function() {};
if(!window.console.error) window.console.error = function() {};
if(!window.console.info) window.console.info = function() {};
if(!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if(!Modernizr.flexbox) {
  (function() {
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('.page-body'),
      noFlexboxStickyFooter = function() {
        $pageBody.height('auto');
        if($pageBody.height() + $('.page-header').outerHeight() + $('.page-footer').outerHeight() < $(window).height()) {
          $pageBody.height($(window).height() - $('.page-header').outerHeight() - $('.page-footer').outerHeight());
        } else {
          $pageWrapper.height('auto');
        }
      };
    $(window).on('load resize', noFlexboxStickyFooter);
  })();
}
if(ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
  (function(){
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('.page-body'),
      ieFlexboxFix = function() {
        if($pageBody.addClass('flex-none').height() + $('.page-header').outerHeight() + $('.page-footer').outerHeight() < $(window).height()) {
          $pageWrapper.height($(window).height());
          $pageBody.removeClass('flex-none');
        } else {
          $pageWrapper.height('auto');
        }
      };
    ieFlexboxFix();
    $(window).on('load resize', ieFlexboxFix);
  })();
}


////////////////////////////////////////

$(document).ready(function(){
     $('.slider').slick({
       dots:true,
       arrows:false
     });

     $('.social-like').on('click', function(e) {
       $(this).toggleClass('selected');
     });


     $('.services-inner-list').on('click', function(e) {
       $(this).toggleClass('active');
     });


    $('.post-inner-category').on('click', function(e) {
          $(this).toggleClass('active');
    });

    $('.tags').on('click', function(e) {
      $(this).toggleClass('active');
    });



    $('.social-hidden-title').on('click', function(e) {
      $(this).next('.social-menu').toggleClass('active');
    });


     $('.hidden-menu').on('click', function(e) {
       $(this).toggleClass('active');
       $(this).next('.main-menu').toggleClass('active');
     });

    //
});

if (window.matchMedia("(max-width: 1200px)").matches) {
  $('.js-inner-content').slideUp();
}


$('.header-search-btn').on('click', function(e) {
    $('.search-block').addClass('visible')
});


function hide() {
  $('.search-block').removeClass('visible');
}

// Esc button closing
$('body').keyup(function(e) {
  if (e.keyCode == 27) {
    hide();
  }
});

var search = $('.header-search-btn');
$('body').click(function(e) {
  if (!$(search).is(e.target)) {
    hide();
    return false;
    }
});

$('.main-menu--item').on('click', function(e){
   e.preventDefault();
   var self = $(this),
     item = self.parents('.js-item-outer'),
     content = item.find('.js-inner-content'),
     contents = $('.js-item-outer .js-inner-content'),
     items = $('.main-outer .js-item-outer');

   if (item.hasClass('active')) {
     item.removeClass('active');
     content.slideUp();
   }
   else {
     items.removeClass('active');
     contents.slideUp();
     item.addClass('active');
     content.slideDown();
   }
 });


 document.addEventListener("DOMContentLoaded",
        function() {
            var div, n,
                v = document.getElementsByClassName("youtube-player");
            for (n = 0; n < v.length; n++) {
                div = document.createElement("div");
                div.setAttribute("data-id", v[n].dataset.id);
                div.innerHTML = labnolThumb(v[n].dataset.id);
                div.onclick = labnolIframe;
                v[n].appendChild(div);
            }
        });

    function labnolThumb(id) {
        var thumb = '<img src="/img/video-thumb.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }

    function labnolIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://www.youtube.com/embed/TcBwY1fSeq0?autoplay=1";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        iframe.setAttribute("width", "570");
        iframe.setAttribute("height", "340");
        this.parentNode.replaceChild(iframe, this);
    }

////////////map

 var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.453277, lng: 30.320708},
          zoom: 15,
          disableDefaultUI: true,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: true,
          styles: [{
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 51
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    }
]
});

var iconBase = 'img/marker.png';
var marker = new google.maps.Marker({
  position: {lat: 50.453277, lng: 30.320708},
  map: map,
  icon: iconBase
});


      }
