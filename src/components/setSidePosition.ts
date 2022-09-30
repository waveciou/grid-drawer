export default function setSidePosition(
  this: any,
  elementList: NodeList,
  begin: number,
  end: number,
  offset: string
): void {
  const { animateEasing, animateTime } = this.CONFIG;
  const _elementList: HTMLElement[] = Array.prototype.slice.call(
    elementList,
    begin,
    end
  );

  window.Velocity(
    _elementList,
    {
      marginLeft: offset,
    },
    {
      duration: animateTime,
      easing: animateEasing,
      queue: false,
    }
  );
}
