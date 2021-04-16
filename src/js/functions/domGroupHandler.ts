export default function domGroupHandler(domList: any, size: number) {
  const result = [];

  for (let i = 0; i < domList.length; i += size) {
    const group: any = Array.prototype.slice.call(domList, i, i + size);
    result.push(group);
  }

  return result;
}