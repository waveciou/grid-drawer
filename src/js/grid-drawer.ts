import '../scss/grid-drawer.scss';

import config from './config';
import * as utils from './utils';

declare global {
  interface Window {
    GridDrawer: any;
  }
}

class GridDrawer {
  CONFIG: any = config;
  GD_CONTAINER: HTMLElement;
  ITEMS_NUMBER: number = 5;

  constructor (payload?: any) {
    if (typeof payload === 'object') {
      this.CONFIG = Object.assign(config, payload);
    }

    const element_node: NodeList = document.querySelectorAll(this.CONFIG.el);

    if (element_node.length < 1) return;
    if (element_node.length > 1) return;

    this.GD_CONTAINER = document.querySelector(this.CONFIG.el);
    this.init();
  }

  init () {
    const { el, classNameItems } = this.CONFIG;

    const $items: any = document.querySelectorAll(`${el} > ${classNameItems}`);
    const groupsArray = utils.wrapArrayHandler($items, this.ITEMS_NUMBER);

    utils.wrapperExecutor(groupsArray, 'div').forEach((groupElement: any, index: number) => {
      const direction: number = index % 2;
      const groupItems: any = groupElement.querySelectorAll(classNameItems);

      let itemsArray: any = [];

      for (let i = 0; i < Math.ceil(groupItems.length / 2); i++) {
        const value: number = i * 2;
        let begin: number = value;
        let ended: number = value + 2;

        if (direction === 0) {
          begin = i > 0 ? value - 1 : 0;
          ended = i > 0 ? value + 1 : 1;
        }

        const domArray = Array.prototype.slice.call(groupItems, begin, ended);
        itemsArray.push(domArray);
      }

      utils.wrapperExecutor(itemsArray, 'div').forEach((element: any, index: number) => {
        const param: string = `${direction}${index}`;
        const size: string = (param === '00' || param === '12') ? 'l' : 's';

        element.className = `gd__side gd__size-${size}`;
        groupElement.appendChild(element);
      });

      groupElement.className = 'gd__group';
      this.GD_CONTAINER.appendChild(groupElement);
    });
  }
}

if (typeof window.GridDrawer === 'undefined') {
  window.GridDrawer = GridDrawer;
}
