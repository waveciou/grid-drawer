export default function directionGroupHandler(elementList: NodeList, direction: number):HTMLElement[][] {
  const result: HTMLElement[][] = [];

  for (let i = 0; i < Math.ceil(elementList.length / 2); i++) {
    const value: number = i * 2;
    let begin: number = value;
    let ended: number = value + 2;

    if (direction === 0) {
      begin = i > 0 ? value - 1 : 0;
      ended = i > 0 ? value + 1 : 1;
    }

    const elementArray: HTMLElement[] = Array.prototype.slice.call(elementList, begin, ended);
    result.push(elementArray);
  }

  return result;
}