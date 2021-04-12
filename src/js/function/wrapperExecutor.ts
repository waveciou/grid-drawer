export default function wrapperExecutor (array: any, tagName: string) {
  return array.map((towrap: any) => {
    return towrap.reduce((prev: any, element: any) => {
      prev.appendChild(element);
      return prev;
    }, document.createElement(tagName));
  });
}