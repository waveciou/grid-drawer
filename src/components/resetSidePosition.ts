export default function resetSidePosition(this: any): void {
  const { animateEasing, animateTime } = this.CONFIG;

  window.Velocity(
    this.GD_SIDES,
    {
      marginLeft: "0%",
    },
    {
      duration: animateTime,
      easing: animateEasing,
      queue: false,
    }
  );
}
