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
      const _elements = elements.querySelectorAll(classNameInside);

      for (let i = 0; i < _elements.length; i++) {
        Velocity(_elements[i], {
          width: '0%',
          opacity: 0
        }, {
          duration: animateTime,
          easing: animateEasing,
          queue: false,
          complete: () => {
            _elements[i].style.display = 'none';
          }
        });
      }
    }

    controlAnimation (elements: any) {
      // 123
    }

    controlSlide () {
      // 123
    }

    // Events
    clickHandler = (e: any) => {
      const { classNameOutside } = this.CONFIG;
      const element = (e.target as Element);
      const $items = getParents(element, 'gd__item');

      if (element.closest(classNameOutside)) {
        if ($items.classList.contains('is-open')) {
          $items.classList.remove('is-open');
        } else {
          for (let i = 0; i < this.GD_ITEMS.length; i++) {
            (<Element>this.GD_ITEMS[i]).classList.remove('is-open');
          }
          $items.classList.add('is-open');
        }
      } else if (element.classList.contains('close-btn')) {
        $items.classList.remove('is-open');
      } else {
        return false;
      }

      window.innerWidth > 1024 ? this.controlAnimation($items) : this.controlSlide();
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
