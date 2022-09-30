export default function setPosition(this: any, screenWidth: number): void {
  if (screenWidth > 1024) {
    Array.prototype.forEach.call(this.GD_GROUPS, (element: HTMLElement) => {
      let width = 0;
      const $sides: NodeList = element.querySelectorAll(".gd__side");

      Array.prototype.forEach.call(
        $sides,
        (sideElement: HTMLElement, index: number) => {
          sideElement.style.left = `${index < 1 ? 0 : width}px`;
          sideElement.style.position = "absolute";
          width = sideElement.offsetWidth + width;
        }
      );
    });
  } else {
    for (let i = 0; i < this.GD_ITEMS.length; i++) {
      (<HTMLElement>this.GD_ITEMS[i]).classList.remove("is-open");
    }

    for (let i = 0; i < this.GD_SIDES.length; i++) {
      (<HTMLElement>this.GD_SIDES[i]).removeAttribute("style");
    }

    for (let i = 0; i < this.GD_INSIDES.length; i++) {
      (<HTMLElement>this.GD_INSIDES[i]).removeAttribute("style");
    }
  }
}
