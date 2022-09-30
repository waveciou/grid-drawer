export default function getNotElements(
  elementList: NodeList,
  target: HTMLElement
) {
  const _elementList: HTMLElement[] = Array.from(elementList) as HTMLElement[];
  const index: number = _elementList.indexOf(target);
  Array.prototype.splice.call(_elementList, index, 1);
  return _elementList.map((element: HTMLElement) => element);
}
