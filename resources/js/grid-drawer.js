(function ($) {
  const $window = $(window);
  let screenWidth = $window.outerWidth();

  const animateEasing = 'easeInOutQuint';
  const animateTime = 600;

  function setGridDrawerElement() {
    if ($('.gridDrawer').length) {
      let $item = $('.gd__item');
      let groupNum = 0;
      const itemNum = 5;
      const sizeLargeStr = `<div class="gd__side gd__size-l"></div>`;
      const sizeSmallStr = `<div class="gd__side gd__size-s"></div>`;

      $item.each(function () {
        let $this = $(this);
        let index = $this.index();
        if (index % itemNum == 0) {
          groupNum += 1;
        }
        let str = `mark_group-${groupNum}`;
        $this.addClass(str);
      });

      for (let i = 0; i < groupNum; i++) {
        let str = `.mark_group-${i + 1}`;
        $(str).wrapAll(`<div class="gd__group"></div>`);
        $item.removeClass(`mark_group-${i + 1}`);
      }

      $('.gd__group .gd__item').each(function () {
        let $this = $(this);
        let index = $this.index() + 1;
        $this.addClass(`mark_item-${index}`);
      });

      $('.gd__group').each(function () {
        let $this = $(this);
        let index = $this.index();
        let targetIndex = index % 2;
        if (targetIndex == 0) {
          $this.children('.mark_item-1').wrap(sizeLargeStr);
          $this.children('.mark_item-2, .mark_item-3').wrapAll(sizeSmallStr);
          $this.children('.mark_item-4, .mark_item-5').wrapAll(sizeSmallStr);
        } else {
          $this.children('.mark_item-1, .mark_item-2').wrapAll(sizeSmallStr);
          $this.children('.mark_item-3, .mark_item-4').wrapAll(sizeSmallStr);
          $this.children('.mark_item-5').wrap(sizeLargeStr);
        }
      });

      for (let k = 0; k < itemNum; k++) {
        $item.removeClass(`mark_item-${k + 1}`);
      }
      setGridDrawerPosition();
    } else {
      return false;
    }
  }

  function setGridDrawerPosition(width) {
    if ($('.gridDrawer').length) {
      if (width > 1024) {
        $('.gd__group').each(function () {
          let sideWidth = 0;
          let sideLeft = 0;
          $(this).children('.gd__side').css({
            position: 'absolute'
          }).each(function (index) {
            let $this = $(this);
            index <= 0 ? (sideLeft = 0) : (sideLeft = sideWidth);
            sideWidth = $this.innerWidth() + sideWidth;
            $this.css({
              left: sideLeft
            });
          });
        });
      } else {
        $('.gd__group .gd__item').removeClass('is-open');
        $('.gd__group .gd__side').attr('style', '');
        $('.gd__group .gd__inside').attr('style', '');
        return false;
      }
    } else {
      return false;
    }
  }

  function setGridDrawerSidePosition(el, initIndex, endIndex, offset) {
    for (let i = initIndex; i < endIndex; i++) {
      el.eq(i).velocity({
        'marginLeft': offset
      }, {
        duration: animateTime,
        easing: animateEasing,
        queue: false
      });
    }
  }

  function resetGridDrawerSidePosition(el) {
    if (el == undefined) {
      el = $('.gd__side');
    }
    el.velocity({
      'marginLeft': '0%'
    }, {
      duration: animateTime,
      easing: animateEasing,
      queue: false
    });
  }

  function closeGridDrawerInside(el) {
    if (el == undefined) {
      el = $('.gridDrawer .gd__item');
    }
    el.children('.gd__inside').velocity({
      width: '0%',
      opacity: 0
    }, {
      duration: animateTime,
      easing: animateEasing,
      queue: false,
      complete: function () {
        $(this).css({
          display: 'none'
        });
      }
    })
  }

  function ctrlGridDrawerAnimate(item) {
    if ($('.gridDrawer').find('.is-open').length) {

      let $mySide = item.parents('.gd__side');
      let $myGroup = item.parents('.gd__group');
      let $allSide = $myGroup.children('.gd__side');
      let allSideLength = $myGroup.children('.gd__side').length;
      let mySideIndex = $mySide.index();
      let mySideWidth, species;

      $mySide.hasClass('gd__size-l') ? mySideWidth = '100%' : mySideWidth = '200%';
      $myGroup.index() % 2 == 0 ? species = true : species = false;

      closeGridDrawerInside($('.gridDrawer .gd__item').not(item));

      item.children('.gd__inside').css({
        display: 'block'
      }).velocity({
        width: mySideWidth,
        opacity: 1
      }, {
        duration: animateTime,
        easing: animateEasing,
        queue: false
      });

      resetGridDrawerSidePosition();

      if (mySideIndex == 2) {
        setGridDrawerSidePosition($allSide, 0, 3, '-50%');
      } else {
        if (species) {
          mySideIndex == 0 ? setGridDrawerSidePosition($allSide, 1, 3, '50%') : setGridDrawerSidePosition($allSide, 0, 2, '-50%');
        } else {
          setGridDrawerSidePosition($allSide, mySideIndex + 1, allSideLength, '50%');
        }
      }
    } else {
      closeGridDrawerInside();
      resetGridDrawerSidePosition();
    }
  }

  function ctrlGridDrawerSlide() {
    $('.gd__item').not('.is-open').children('.gd__inside').stop(true, true).slideUp(animateTime);
    $('.gd__item.is-open').children('.gd__inside').stop(true, true).slideDown(animateTime);
    return false;
  }

  $('.gridDrawer .open-btn').on('mousedown', function (e) {
    e.preventDefault();
  });

  $('.gridDrawer').on('click', function (e) {
    if ($('.gridDrawer .gd__inside').is('.velocity-animating') == false) {
      let $el = $(e.target);
      let $item = $el.parents('.gd__item');

      if ($el.hasClass('open-btn')) {
        if ($item.hasClass('is-open')) {
          $item.removeClass('is-open');
        } else {
          $('.gridDrawer .gd__item').removeClass('is-open');
          $item.addClass('is-open');
        }
      } else if ($el.hasClass('close-btn')) {
        $item.removeClass('is-open');
      } else if (!$el.is('a')) {
        return false;
      }

      screenWidth = $window.outerWidth();
      screenWidth > 1024 ? ctrlGridDrawerAnimate($item) : ctrlGridDrawerSlide();
    } else {
      return false;
    }
  });

  setGridDrawerElement();

  let throttle = function (type, name, obj) {
    obj = obj || window;
    let running = false;
    let func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');

  $window.on('optimizedResize', function () {
    screenWidth = $window.outerWidth();
    setGridDrawerPosition(screenWidth);
  }).trigger('optimizedResize');

})($)