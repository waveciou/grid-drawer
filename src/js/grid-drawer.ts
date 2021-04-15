import '../scss/grid-drawer.scss';

import config from './config';

// * Function
import domGroupHandler from './function/domGroupHandler';
import domWrapHandler from './function/domWrapHandler';
import directionGroupHandler from './function/directionGroupHandler';
import wrapInnerExecutor from './function/wrapInnerExecutor';
import createCloseBtnExecutor from './function/createCloseBtnExecutor';

// * Tools
import throttle from './function/throttle';

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
      const { classNameItems } = this.CONFIG;
      this.creatElement();

      this.GD_GROUPS = document.querySelectorAll(`${this.EL} .gd__group`);
      this.GD_SIDES = document.querySelectorAll(`${this.EL} .gd__side`);
      this.GD_ITEMS = document.querySelectorAll(`${this.EL} ${classNameItems}`);

      window.addEventListener('resize', throttle(() => {
        this.setPosition(window.innerWidth);
      }, 100));

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
      const { classNameInside } = this.CONFIG;

      if (screenWidth > 1024) {
        Array.prototype.forEach.call(this.GD_GROUPS, (element: any) => {
          let sideWidth = 0;
          const $sides = element.querySelectorAll('.gd__side');

          Array.prototype.forEach.call($sides, (sideElement: any, index: number) => {
            sideElement.style.left = `${index < 1 ? 0 : sideWidth}px`;
            sideElement.style.position = 'absolute';
            sideWidth = sideElement.offsetWidth + sideWidth;
          });
        });
      } else {
        const $insides: any = document.querySelectorAll(`${this.EL} ${classNameInside}`);

        Array.prototype.forEach.call($insides, (element: any) => {
          element.removeAttribute('style');
        });

        Array.prototype.forEach.call(this.GD_ITEMS, (element: any) => {
          element.classList.remove('is-open');
        });

        Array.prototype.forEach.call(this.GD_SIDES, (element: any) => {
          element.removeAttribute('style');
        });
      }
    }

    setSidePosition (element: any, beginIndex: number, endIndex: number, offset: number) {
      const { animateEasing, animateTime } = this.CONFIG;
      for (let i = beginIndex; i < endIndex; i++) {
        Velocity(element, {
          'marginLeft': offset
        }, {
          duration: animateTime,
          easing: animateEasing,
          queue: false
        });
      }
    }

    resetSidePosition (element: any) {
      if (element == undefined) {
        element = this.GD_SIDES;
      }
    }
  }

  if (typeof window.GridDrawer === 'undefined') {
    window.GridDrawer = GridDrawer;
  }
})(window.Velocity);
