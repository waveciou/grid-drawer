export default function directionGroupHandler(domList: any, direction: number) {
  const result: any = [];

  for (let i = 0; i < Math.ceil(domList.length / 2); i++) {
    const value: number = i * 2;
    let begin: number = value;
    let ended: number = value + 2;

    if (direction === 0) {
      begin = i > 0 ? value - 1 : 0;
      ended = i > 0 ? value + 1 : 1;
    }

    const domArray = Array.prototype.slice.call(domList, begin, ended);
    result.push(domArray);
  }

  return result;
}