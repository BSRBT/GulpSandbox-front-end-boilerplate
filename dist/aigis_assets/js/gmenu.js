$( document ).ready(function() {
  $('.js-toggle-side').click(toggleSideMenu);
  $('.js-toggle-lang').click(toggleLangMenu);
  $('.js-show-submenu').click(showSubmenuHover);
  $('.js-side-back').click(toggleSubmenu);
  $('.js-gmenu-overlay').click(toggleSideMenu);

  //toggle breadcrumb submenu

  $('.js-breadcrumb-toggle').click(toggleBreadcrumb);

  $('.ds-g-left-list__item').hover(reinitListState);

  $('.ds-g-submenu').mouseleave(reinitListState);
  $('.js-show-submenu li').hover(showSubmenuHover);
  $('.js-show-submenu li').click(showSubmenuHoverClick);


  //$('.js-show-submenu li').mouseout(showSubmenuOut);


});


function toggleSideMenu(e){
  $('.ds-g-left-bar').toggleClass('ds-g-left-bar--open');
  $('.ds-g-overlay').toggleClass('visible');
  $('.ds-gmenu-wrapper').toggleClass('active');

  if(!$('.ds-g-left-bar').hasClass('ds-g-left-bar--open'))
    $('.ds-g-submenu').removeClass('active');
}

function toggleLangMenu(e){
  console.log('toggle Lang');
  //$('.js-left-menu-nav').toggle();
  $('.js-left-menu-lang').toggleClass('active');

  if($('.ds-g-left-bar').hasClass('ds-g-left-bar--lang-choice'))
    $('.ds-g-submenu').removeClass('active')
}

function toggleSubmenu(e){
  $('.ds-g-submenu').toggleClass('active');
}

function showSubmenuHover(e){


  if ($(window).width() >= 720){
    showSubmenu(e)
  }

}

function showSubmenuHoverClick(e){


  if ($(window).width() < 720){
    showSubmenu(e)
  }

}

function showSubmenu(e){
  var $target = $(e.currentTarget);

  $('.js-show-submenu li').removeClass('active');
  $target.addClass('active');

  if($target.is("a")){
    var li = $target.find('li')
    $('.ds-g-submenu').find('#'+li.data().menuCat).show();
  }
  else{
    $('.ds-g-submenu').toggleClass('active');
    $('.ds-g-submenu').find('.ds-g-submenu__item').hide();
    $('.ds-g-submenu').find('#'+e.currentTarget.dataset.menuCat).show();
  }
}

function reinitListState(e){
  $('.js-show-submenu li').removeClass('active');
}


function toggleBreadcrumb(e){
  e.preventDefault();
  $(e.currentTarget).toggleClass('active');
  $(e.currentTarget).parent().parent().find('.js-breadcrumb-submenu').fadeToggle(200);
}