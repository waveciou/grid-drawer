import '../scss/grid-drawer.scss';

import config from './config';

// * Components
import buildElement from './components/buildElement';
import creatElement from './components/creatElement';
import setPosition from './components/setPosition';

// * Events
import _clickHandler from './events/clickHandler';
import _resizeHandler from './events/resizeHandler';

// * InterFace
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
  data?: [];
}

(function(Velocity) {
  if (Velocity === undefined) {
    console.error('Please import Velocity.js in your file.');
    return;
  }

  class GridDrawer {
    EL: string;
    CONFIG: iConfig = config;
    GD_CONTAINER: HTMLElement;
    GD_GROUPS: NodeList;
    GD_SIDES: NodeList;
    GD_ITEMS: NodeList;
    GD_INSIDES: NodeList;
    GD_OUTSIDES: NodeList;
    GD_ORIGINAL_DOM: string;

    constructor (el: string, options?: iConfig) {
      this.EL = el;
      this.CONFIG = Object.assign(config, options);

      const { classNameItems, classNameOutside, classNameInside } = this.CONFIG;
      const elementList: NodeList = document.querySelectorAll(el);

      if (elementList.length !== 1) {
        console.error('You must be assign the element.');
        return;
      }

      this.GD_CONTAINER = document.querySelector(el);
      this.GD_CONTAINER.classList.add('gd__container');
      this.GD_ORIGINAL_DOM = this.GD_CONTAINER.innerHTML;

      // * Build Elements
      buildElement.call(this);

      // * Initialize
      creatElement.call(this);

      this.GD_GROUPS = document.querySelectorAll(`${this.EL} .gd__group`);
      this.GD_SIDES = document.querySelectorAll(`${this.EL} .gd__side`);
      this.GD_ITEMS = document.querySelectorAll(`${this.EL} ${classNameItems}`);
      this.GD_INSIDES = document.querySelectorAll(`${this.EL} ${classNameInside}`);
      this.GD_OUTSIDES = document.querySelectorAll(`${this.EL} ${classNameOutside}`);

      this.GD_CONTAINER.addEventListener('click', this.clickHandler, false);
      window.addEventListener('resize', this.resizeHandler);

      setPosition.call(this, window.innerWidth);
    }

    // * Events
    clickHandler = (e: MouseEvent) => {
      _clickHandler.call(this, e);
    };

    resizeHandler = () => {
      _resizeHandler.call(this);
    };

    // * Methods
    destroy(deleteInstance = true):null {
      this.GD_CONTAINER.removeEventListener('click', this.clickHandler, false);
      window.removeEventListener('resize', this.resizeHandler);

      this.GD_CONTAINER.innerHTML = this.GD_ORIGINAL_DOM;
      this.GD_CONTAINER.classList.remove('gd__container');
      this.GD_CONTAINER.classList.remove('gd__is-open');

      if (deleteInstance === true) {
        const _instance: any = this;

        Object.keys(_instance).forEach(key => {
          try { _instance[key] = null; }
          catch (e) { console.log(e); }

          try { delete _instance[key]; }
          catch (e) { console.log(e); }
        });
      }

      return null;
    }
  }

  if (typeof window.GridDrawer === 'undefined') {
    window.GridDrawer = GridDrawer || {};
  }
})(window.Velocity);
