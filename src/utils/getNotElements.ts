export default function getNotElements (elementList: NodeList, target: HTMLElement) {
  const _elementList = Array.from(elementList);
  const index: number = _elementList.indexOf(target);
  Array.prototype.splice.call(_elementList, index, 1);
  return _elementList.map((element: HTMLElement) => element);
}