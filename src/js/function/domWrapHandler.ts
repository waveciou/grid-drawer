// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function domWrapHandler(domList: any, tagName: string) {
  return domList.map((towrap: any) => {
    return towrap.reduce((prev: any, element: any) => {
      prev.appendChild(element);
      return prev;
    }, document.createElement(tagName));
  });
}