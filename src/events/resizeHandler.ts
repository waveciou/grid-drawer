// * Components
import setPosition from "../components/setPosition";

// * Tools
import throttle from "../utils/throttle";

export default function resizeHandler(this: any) {
  throttle(() => {
    setPosition.call(this, window.innerWidth);
  }, 600).call(this);
}
