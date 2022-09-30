export default function domWrapHandler(elementList: HTMLElement[][], tagName: string):HTMLElement[] {
  return elementList.map((towrap: HTMLElement[]) => {
    return towrap.reduce((prev: HTMLElement, element: HTMLElement) => {
      prev.appendChild(element);
      return prev;
    }, document.createElement(tagName));
  });
}