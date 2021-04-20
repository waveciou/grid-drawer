import '../scss/grid-drawer.scss';

import config from './config';

// * Components
import creatElement from './components/creatElement';
import setPosition from './components/setPosition';

// * Events
import clickHandler from './events/clickHandler';
import resizeHandler from './events/resizeHandler';

declare global {
  interface Window {
    GridDrawer: any;
    Velocity: any;
  }
}

interface iConfig {
  classNameItems?: string;
  classNameOutside?: string;
  classNameInside?: string;
  animateEasing?: string;
  animateTime?: number;
}

(function(Velocity) {
  if (Velocity === undefined) {
    console.error('Please import Velocity.js in your file.');
    return;
  }

  class GridDrawer {
    EL: string;
    CONFIG: iConfig = config;
    ITEMS_NUMBER = 5;
    GD_CONTAINER: HTMLElement;
    GD_GROUPS: NodeList;
    GD_SIDES: NodeList;
    GD_ITEMS: NodeList;
    GD_INSIDES: NodeList;
    GD_OUTSIDES: NodeList;

    constructor (el: string, options?: iConfig) {
      this.EL = el;
      this.CONFIG = Object.assign(config, options);

      const elementList: NodeList = document.querySelectorAll(el);

      if (elementList.length !== 1) {
        console.error('You must assign one element.');
        return;
      }

      this.GD_CONTAINER = document.querySelector(el);
      this.GD_CONTAINER.classList.add('gd__container');

      // * Events
      const _clickHandler = (e: MouseEvent) => {
        clickHandler.call(this, e);
      };

      const _resizeHandler = () => {
        resizeHandler.call(this);
      };

      // * Initialize
      const { classNameItems, classNameOutside, classNameInside } = this.CONFIG;
      creatElement.call(this);

      this.GD_GROUPS = document.querySelectorAll(`${this.EL} .gd__group`);
      this.GD_SIDES = document.querySelectorAll(`${this.EL} .gd__side`);
      this.GD_ITEMS = document.querySelectorAll(`${this.EL} ${classNameItems}`);
      this.GD_INSIDES = document.querySelectorAll(`${this.EL} ${classNameInside}`);
      this.GD_OUTSIDES = document.querySelectorAll(`${this.EL} ${classNameOutside}`);

      this.GD_CONTAINER.addEventListener('click', _clickHandler, false);
      window.addEventListener('resize', _resizeHandler);

      setPosition.call(this, window.innerWidth);
    }
  }

  if (typeof window.GridDrawer === 'undefined') {
    window.GridDrawer = GridDrawer || {};
  }
})(window.Velocity);
