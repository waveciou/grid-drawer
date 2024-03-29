export default function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return () => {
    const args: IArguments = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
