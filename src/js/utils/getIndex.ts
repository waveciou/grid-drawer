export default function getIndex (element: any) {
  if (!element) return -1;
  let i = 0;
  do {
    i++;
  } while (element = element.previousElementSibling);
  return i;
}