export function query (selectors: string) {
  return document.querySelector(selectors);
}

export function queryAll (selectors: string) {
  return document.querySelectorAll(selectors);
}

export function forEach (array: any, callback: any, scope?: any) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
}

export function chunk (array: any, size: number) {
  let arr = [];
  for (let i = 0; i < array.length; i += size) {
    let newSlicedArray = Array.prototype.slice.call(array, i, i + size);
    arr.push(newSlicedArray);
  }
  return arr;
}