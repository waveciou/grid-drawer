export default function wrapInnerExecutor(domList: any, className: string) {
  for (let i = 0; i < domList.length; i++) {
    const innerContent = domList[i].innerHTML;
    domList[i].innerHTML = `<div class="${className}">${innerContent}</div>`;
  }
}