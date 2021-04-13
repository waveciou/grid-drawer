import '../scss/grid-drawer.scss';

import config from './config';

// * Function
import domGroupHandler from './function/domGroupHandler';
import domWrapHandler from './function/domWrapHandler';
import directionGroupHandler from './function/directionGroupHandler';
import wrapInnerExecutor from './function/wrapInnerExecutor';
import createCloseBtnExecutor from './function/createCloseBtnExecutor';

declare global {
  interface Window {
    GridDrawer: any;
  }
}

class GridDrawer {
  EL: string;
  CONFIG: any = config;
  GD_CONTAINER: HTMLElement;
  ITEMS_NUMBER = 5;

  constructor (el: string, options?: any) {
    this.EL = el;
    this.CONFIG = Object.assign(config, options);

    const element_node: NodeList = document.querySelectorAll(el);
    if (element_node.length < 1) return;
    if (element_node.length > 1) return;

    this.GD_CONTAINER = document.querySelector(el);
    this.init();
  }

  init () {
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
}

if (typeof window.GridDrawer === 'undefined') {
  window.GridDrawer = GridDrawer;
}
