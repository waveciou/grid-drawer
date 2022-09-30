export default function closeInside (elementList: HTMLElement[] | NodeList):void {
  const { classNameInside, animateEasing, animateTime } = this.CONFIG;

  Array.prototype.forEach.call(elementList, (element: HTMLElement) => {
    const sideElementList = element.querySelectorAll(classNameInside);

    window.Velocity(sideElementList, {
      width: '0%',
      opacity: 0
    }, {
      duration: animateTime,
      easing: animateEasing,
      queue: false,
      complete: (sideElements: HTMLElement[]) => {
        for (let i = 0; i < sideElements.length; i ++) {
          sideElements[i].style.display = 'none';
        }
      }
    });
  });
}