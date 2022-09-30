export default function domGroupHandler(elementList: NodeList, size: number):HTMLElement[][] {
  const result: HTMLElement[][] = [];

  for (let i = 0; i < elementList.length; i += size) {
    const group: HTMLElement[] = Array.prototype.slice.call(elementList, i, i + size);
    result.push(group);
  }

  return result;
}