// * Tools
import excludeString from "../utils/excludeString";

// * InterFace
interface iBuildElement {
  [outside: string]: any;
  inside: string;
}

export default function buildElement(this: any): void {
  const { data, classNameItems, classNameOutside, classNameInside } =
    this.CONFIG;

  if (typeof data === "undefined") return;

  if (Array.isArray(data) === false) {
    console.error("The data type must be array.");
    return;
  }

  const _data: iBuildElement[] = [...data];

  // * Validation Format
  const validItems: string[] = ["inside", "outside"];

  const validResult: boolean = _data.every((element: iBuildElement) => {
    const validator: boolean[] = [];

    validItems.forEach((key: string) => {
      validator.push(Object.prototype.hasOwnProperty.call(element, key));
      const type: boolean = typeof element[key] === "string" ? true : false;
      validator.push(type);
    });

    return validator.every((valid: boolean) => valid === true);
  });

  if (validResult === false) {
    console.error(
      "You must be setting HTML element of inside and outside in data list."
    );
    return;
  }

  // * Build Element
  this.GD_CONTAINER.innerHTML = _data.reduce(
    (prevElement: string, element: iBuildElement) => {
      const dom = `
      <div class="${excludeString(classNameItems, ".")}">
        <div class="${excludeString(classNameOutside, ".")}">${
        element.outside
      }</div>
        <div class="${excludeString(classNameInside, ".")}">${
        element.inside
      }</div>
      </div>`;
      return prevElement + dom;
    },
    ""
  );
}
