export default function wrapInnerExecutor(elementList: NodeList, className: string):void {
  for (let i = 0; i < elementList.length; i++) {
    const innerContent: string = (<HTMLElement>elementList[i]).innerHTML;
    (<HTMLElement>elementList[i]).innerHTML = `<div class="${className}">${innerContent}</div>`;
  }
}