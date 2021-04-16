export default function getNotElements (elements: any, target: any) {
  const _elements = Array.from(elements);
  const index = _elements.indexOf(target);
  Array.prototype.splice.call(_elements, index, 1);
  return _elements;
}