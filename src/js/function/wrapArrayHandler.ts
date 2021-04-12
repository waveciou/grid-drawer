export default function wrapArrayHandler (nodeList: any, size: number) {
  let result = [];
  for (let i = 0; i < nodeList.length; i += size) {
    let newSlicedArray = Array.prototype.slice.call(nodeList, i, i + size);
    result.push(newSlicedArray);
  }
  return result;
}