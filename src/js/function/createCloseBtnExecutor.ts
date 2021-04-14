export default function createCloseBtnExecutor (domList: any, className: string): void {
  for (let i = 0; i < domList.length; i++) {
    const closeButton = document.createElement('a');
    closeButton.setAttribute('href', 'javascript:;');
    closeButton.setAttribute('title', 'close');
    closeButton.textContent = 'close';
    closeButton.className = className;
    domList[i].appendChild(closeButton);
  }
}