export default function createCloseBtnExecutor (elementList: NodeList, className: string):void {
  for (let i = 0; i < elementList.length; i++) {
    const closeButton: HTMLElement = document.createElement('a');
    closeButton.setAttribute('href', 'javascript:;');
    closeButton.setAttribute('title', 'close');
    closeButton.textContent = '';
    closeButton.className = className;
    elementList[i].appendChild(closeButton);
  }
}