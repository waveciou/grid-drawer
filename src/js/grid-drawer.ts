import '../scss/grid-drawer.scss';

import CONFIG from './config';
import * as utils from './utils';

class GridDrawer {
  config: any = CONFIG;
  gd_container: HTMLElement;
  amountGroup: number = 0;

  constructor (cfg?: any) {
    if (typeof cfg === 'object') {
      this.config = Object.assign(CONFIG, cfg);
    }

    const EL_NODE: NodeList = utils.queryAll(this.config.el);

    if (EL_NODE.length < 1) return;
    if (EL_NODE.length > 1) return;

    this.gd_container = document.querySelector(this.config.el);
    this.init();
  }

  init () {
    const { el, itemsClassName, itemsNumber } = this.config;

    const $items: any = utils.queryAll(`${el} > ${itemsClassName}`);

    utils.chunk($items, itemsNumber).map(towrap => {
      const finil = towrap.reduce((acc: any, element: any) => {
        acc.appendChild(element);
        return acc;
      }, document.createElement('div'));

      return finil;
    }).forEach(element => {
      element.className = 'gd__group';
      this.gd_container.appendChild(element);
    });

  }
}

const gd = new GridDrawer();