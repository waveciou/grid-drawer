
export function wrapArrayHandler (nodeList: any, size: number) {
  let result = [];
  for (let i = 0; i < nodeList.length; i += size) {
    let newSlicedArray = Array.prototype.slice.call(nodeList, i, i + size);
    result.push(newSlicedArray);
  }
  return result;
}

export function wrapperExecutor (array: any, tagName: string) {
  return array.map((towrap: any) => {
    return towrap.reduce((prev: any, element: any) => {
      prev.appendChild(element);
      return prev;
    }, document.createElement(tagName));
  });
}