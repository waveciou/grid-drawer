import '../scss/grid-drawer.scss';

import config from './config';

// * Function
import domGroupHandler from './functions/domGroupHandler';
import domWrapHandler from './functions/domWrapHandler';
import directionGroupHandler from './functions/directionGroupHandler';
import wrapInnerExecutor from './functions/wrapInnerExecutor';
import createCloseBtnExecutor from './functions/createCloseBtnExecutor';

// * Tools
import throttle from './utils/throttle';
import getParents from './utils/getParents';
import getIndex from './utils/getIndex';
import getNotElements from './utils/getNotElements';

declare global {
  interface Window {
    GridDrawer: any;
    Velocity: any;
  }
}

(function(Velocity) {
  if (Velocity === undefined) {
    console.error('Please import Velocity.js in this files.');
  }

  class GridDrawer {
    EL: string;
    CONFIG: any = config;
    ITEMS_NUMBER = 5;
    GD_CONTAINER: HTMLElement;
    GD_GROUPS: NodeList;
    GD_SIDES: NodeList;
    GD_ITEMS: NodeList;
    GD_INSIDES: NodeList;
    GD_OUTSIDES: NodeList;

    constructor (el: string, options?: any) {
      this.EL = el;
      this.CONFIG = Object.assign(config, options);

      const element_node: NodeList = document.querySelectorAll(el);
      if (element_node.length !== 1) return;

      this.GD_CONTAINER = document.querySelector(el);
      this.GD_CONTAINER.classList.add('gd__container');
      this.init();
    }

    init () {
      const { classNameItems, classNameOutside, classNameInside } = this.CONFIG;
      this.creatElement();

      this.GD_GROUPS = document.querySelectorAll(`${this.EL} .gd__group`);
      this.GD_SIDES = document.querySelectorAll(`${this.EL} .gd__side`);
      this.GD_ITEMS = document.querySelectorAll(`${this.EL} ${classNameItems}`);
      this.GD_INSIDES = document.querySelectorAll(`${this.EL} ${classNameInside}`);
      this.GD_OUTSIDES = document.querySelectorAll(`${this.EL} ${classNameOutside}`);

      this.GD_CONTAINER.addEventListener('click', this.clickHandler, false);
      window.addEventListener('resize', this.resizeHandler);
      this.setPosition(window.innerWidth);
    }

    creatElement () {
      const { classNameItems, classNameOutside, classNameInside } = this.CONFIG;

      const $items: any = document.querySelectorAll(`${this.EL} > ${classNameItems}`);
      const $outsides: any = document.querySelectorAll(`${this.EL} ${classNameOutside}`);
      const $insides: any = document.querySelectorAll(`${this.EL} ${classNameInside}`);

      wrapInnerExecutor($outsides, 'gd__wrap');
      wrapInnerExecutor($insides, 'gd__wrap');

      const $insideWrap: any = document.querySelectorAll(`${this.EL} ${classNameInside} .gd__wrap`);
      wrapInnerExecutor($insideWrap, 'gd__content');

      createCloseBtnExecutor($insides, 'close-btn');

      const groupsArray = domGroupHandler($items, this.ITEMS_NUMBER);

      domWrapHandler(groupsArray, 'div').forEach((groupElement: any, index: number) => {
        const direction: number = index % 2;
        const $groupItems: any = groupElement.querySelectorAll(classNameItems);
        const sidesArray: any = directionGroupHandler($groupItems, direction);

        domWrapHandler(sidesArray, 'div').forEach((element: any, index: number) => {
          const param = `${direction}${index}`;
          const size: string = (param === '00' || param === '12') ? 'l' : 's';

          element.className = `gd__side gd__size-${size}`;
          groupElement.appendChild(element);
        });

        groupElement.className = 'gd__group';
        this.GD_CONTAINER.appendChild(groupElement);
      });
    }

    setPosition (screenWidth: number) {
      if (screenWidth > 1024) {
        Array.prototype.forEach.call(this.GD_GROUPS, (element: any) => {
          let width = 0;
          const $sides = element.querySelectorAll('.gd__side');

          Array.prototype.forEach.call($sides, (sideElement: any, index: number) => {
            sideElement.style.left = `${index < 1 ? 0 : width}px`;
            sideElement.style.position = 'absolute';
            width = sideElement.offsetWidth + width;
          });
        });
      } else {
        for (let i = 0; i < this.GD_ITEMS.length; i++) {
          (<Element>this.GD_ITEMS[i]).classList.remove('is-open');
        }

        for (let i = 0; i < this.GD_SIDES.length; i++) {
          (<Element>this.GD_SIDES[i]).removeAttribute('style');
        }

        for (let i = 0; i < this.GD_INSIDES.length; i++) {
          (<Element>this.GD_INSIDES[i]).removeAttribute('style');
        }
      }
    }

    setSidePosition (elements: any, begin: number, end: number, offset: string) {
      const { animateEasing, animateTime } = this.CONFIG;
      const _elements = Array.prototype.slice.call(elements, begin, end);

      for (let i = 0; i < _elements.length; i++) {
        Velocity(_elements[i], {
          'marginLeft': offset
        }, {
          duration: animateTime,
          easing: animateEasing,
          queue: false
        });
      }
    }

    resetSidePosition () {
      const { animateEasing, animateTime } = this.CONFIG;

      Velocity(this.GD_SIDES, {
        'marginLeft': '0%'
      }, {
        duration: animateTime,
        easing: animateEasing,
        queue: false
      });
    }

    closeInside (elements: any = this.GD_ITEMS) {
      const { classNameInside, animateEasing, animateTime } = this.CONFIG;

      Array.prototype.forEach.call(elements, (element: any) => {
        const _elements = element.querySelectorAll(classNameInside);

        Velocity(_elements, {
          width: '0%',
          opacity: 0
        }, {
          duration: animateTime,
          easing: animateEasing,
          queue: false,
          complete: () => {
            for (let i = 0; i < _elements.length; i++) {
              _elements[i].style.display = 'none';
            }
          }
        });
      });
    }

    controlAnimation (element: any) {
      const { classNameInside, animateEasing, animateTime } = this.CONFIG;

      if (this.GD_CONTAINER.querySelectorAll('.is-open').length) {
        const $side = getParents(element, 'gd__side');
        const $group = getParents(element, 'gd__group');
        const $allSides = $group.querySelectorAll('.gd__side');
        const $inside = element.querySelector(classNameInside);
        const index = getIndex($side);

        const sideWidth: string = $side.classList.contains('gd__size-l') === true ? '100%' : '200%';
        const species: boolean = getIndex($group) % 2 === 0 ? true : false;

        this.closeInside(getNotElements(this.GD_ITEMS, element));

        $inside.style.display = 'block';

        Velocity($inside, {
          width: sideWidth,
          opacity: 1
        }, {
          duration: animateTime,
          easing: animateEasing,
          queue: false,
        });

        this.resetSidePosition();

        // LIFT
        // 1 false: 1, 3, '50%'
        // 2 false: 0, 2, '-50%'
        // 3 false: 0, 3, '-50%'

        // RIGHT
        // 1 true: 1, 3, '50%'
        // 2 true: 2, 3, '50%'
        // 3 true: 0, 3, '-50%'

        const config = { begin: 1, end: 3, offset: '50%' };

        switch(index) {
        case 2:
          config.begin = species ? 2 : 0;
          config.end = species ? 3 : 2;
          config.offset = species ? '50%' : '-50%';
          break;
        case 3:
          config.begin = 0;
          config.offset = '-50%';
          break;
        }

        this.setSidePosition($allSides, config.begin, config.end, config.offset);
      } else {
        this.closeInside();
        this.resetSidePosition();
      }
    }

    controlSlide () {
      const { classNameInside } = this.CONFIG;

      Array.prototype.forEach.call(this.GD_ITEMS, (element: any) => {
        const $inside = element.querySelector(classNameInside);
        const isOpen = element.classList.contains('is-open');
        $inside.style.display = isOpen ? 'block' : 'none';
      });

      return false;
    }

    // Events
    clickHandler = (e: any) => {
      const isAnimating = Array.prototype.some.call(this.GD_INSIDES, (element: any) => {
        return element.classList.contains('velocity-animating') === true;
      });

      if (isAnimating) return false;

      const { classNameOutside } = this.CONFIG;
      const element = (e.target as Element);
      const $item = getParents(element, 'gd__item');

      if (element.closest(classNameOutside)) {
        if ($item.classList.contains('is-open')) {
          $item.classList.remove('is-open');
        } else {
          for (let i = 0; i < this.GD_ITEMS.length; i++) {
            (<Element>this.GD_ITEMS[i]).classList.remove('is-open');
          }
          $item.classList.add('is-open');
        }
      } else if (element.classList.contains('close-btn')) {
        $item.classList.remove('is-open');
      } else {
        return false;
      }

      window.innerWidth > 1024 ? this.controlAnimation($item) : this.controlSlide();
      return false;
    }

    resizeHandler = () => {
      throttle(() => {
        this.setPosition(window.innerWidth);
      }, 600).apply(this);
    }
  }

  if (typeof window.GridDrawer === 'undefined') {
    window.GridDrawer = GridDrawer;
  }
})(window.Velocity);
