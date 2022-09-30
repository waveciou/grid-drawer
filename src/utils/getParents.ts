export default function getParents (element: HTMLElement, className: string) {
  let parentElement: HTMLElement | null = element;
  while (parentElement && parentElement.classList.contains(className) === false) {
    parentElement = (parentElement.parentNode as HTMLElement);
    if (parentElement.tagName === undefined) {
      return undefined;
    }
  }
  return parentElement;
}