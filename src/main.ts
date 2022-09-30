import "./main.scss";

declare global {
  interface Window {
    GridDrawer: any;
  }
}

(function () {
  class GridDrawer {
    ELEMENT: string;

    constructor(el: string) {
      this.ELEMENT = el;

      console.log(this.ELEMENT);
    }
  }

  if (window.GridDrawer === undefined) {
    window.GridDrawer = GridDrawer || {};
  }
})();
