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
//////////////////////////////////////////////////////////////////////////////////////////////////////////


var carouselPhoto = new Swiper ('#demo1 .swiper-container--single', {
  pagination: '.swiper-pagination',
  nextButton: '#demo1 .swiper-button-next',
  prevButton: '#demo1 .swiper-button-prev',
  paginationClickable: true,
  slidesPerView: 2,
  spaceBetween: 40,
  breakpoints: {
    720: {
        slidesPerView: 1,
        spaceBetween: 16,
    },
    1041: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1441: {
      slidesPerView: 2,
      spaceBetween: 32,
    }
  },
});
