import domGroupHandler from "../functions/domGroupHandler";
import domWrapHandler from "../functions/domWrapHandler";
import directionGroupHandler from "../functions/directionGroupHandler";
import wrapInnerExecutor from "../functions/wrapInnerExecutor";
import createCloseBtnExecutor from "../functions/createCloseBtnExecutor";

export default function creatElement(this: any): void {
  const { classNameItems, classNameOutside, classNameInside } = this.CONFIG;
  const ITEMS_NUMBER = 5;

  const $items: NodeList = document.querySelectorAll(
    `${this.EL} > ${classNameItems}`
  );
  const $outsides: NodeList = document.querySelectorAll(
    `${this.EL} ${classNameOutside}`
  );
  const $insides: NodeList = document.querySelectorAll(
    `${this.EL} ${classNameInside}`
  );

  wrapInnerExecutor($outsides, "gd__wrap");
  wrapInnerExecutor($insides, "gd__wrap");

  const $insideWrap: NodeList = document.querySelectorAll(
    `${this.EL} ${classNameInside} .gd__wrap`
  );
  wrapInnerExecutor($insideWrap, "gd__content");

  createCloseBtnExecutor($insides, "close-btn");

  const groupsArray: HTMLElement[][] = domGroupHandler($items, ITEMS_NUMBER);

  domWrapHandler(groupsArray, "div").forEach(
    (groupElement: HTMLElement, index: number) => {
      const direction: number = index % 2;
      const $groupItems: NodeList =
        groupElement.querySelectorAll(classNameItems);
      const sidesArray: HTMLElement[][] = directionGroupHandler(
        $groupItems,
        direction
      );

      domWrapHandler(sidesArray, "div").forEach(
        (element: HTMLElement, index: number) => {
          const param = `${direction}${index}`;
          const size: string = param === "00" || param === "12" ? "l" : "s";

          element.className = `gd__side gd__size-${size}`;
          groupElement.appendChild(element);
        }
      );

      groupElement.className = "gd__group";
      this.GD_CONTAINER.appendChild(groupElement);
    }
  );
}
