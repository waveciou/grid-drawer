export default function getParents (element: any = undefined, className: string) {
  let praentElement = element;
  while (praentElement.classList.contains(className) === false) {
    praentElement = praentElement.parentNode;
    if (praentElement === document) {
      return undefined;
    }
  }
  return praentElement;
}