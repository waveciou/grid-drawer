export default function getIndex(element: Element) {
  if (!element) return -1;

  let index = 0;
  do {
    index++;
  } while ((element = element.previousElementSibling as Element));
  return index;
}
