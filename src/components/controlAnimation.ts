// * Components
import setSidePosition from "./setSidePosition";
import resetSidePosition from "./resetSidePosition";
import closeInside from "./closeInside";

// * Tools
import getParents from "../utils/getParents";
import getIndex from "../utils/getIndex";
import getNotElements from "../utils/getNotElements";

// * InterFace
interface iSidePositionParam {
  begin: number;
  end: number;
  offset: string;
}

export default function controlAnimation(
  this: any,
  element: HTMLElement
): void {
  const { classNameInside, animateEasing, animateTime } = this.CONFIG;

  if (this.GD_CONTAINER.querySelectorAll(".is-open").length) {
    const $side: HTMLElement = getParents(element, "gd__side") as HTMLElement;
    const $group: HTMLElement = getParents(element, "gd__group") as HTMLElement;
    const $allSides: NodeList = $group.querySelectorAll(".gd__side");
    const $inside: HTMLElement = element.querySelector(classNameInside);
    const index: number = getIndex($side);

    const sideWidth: string =
      $side.classList.contains("gd__size-l") === true ? "100%" : "200%";
    const species: boolean = getIndex($group) % 2 === 0 ? true : false;

    closeInside.call(this, getNotElements(this.GD_ITEMS, element));

    $inside.style.display = "block";

    window.Velocity(
      $inside,
      {
        width: sideWidth,
        opacity: 1,
      },
      {
        duration: animateTime,
        easing: animateEasing,
        queue: false,
      }
    );

    resetSidePosition.call(this);

    // LIFT
    // 1 false: 1, 3, '50%'
    // 2 false: 0, 2, '-50%'
    // 3 false: 0, 3, '-50%'

    // RIGHT
    // 1 true: 1, 3, '50%'
    // 2 true: 2, 3, '50%'
    // 3 true: 0, 3, '-50%'

    const config: iSidePositionParam = { begin: 1, end: 3, offset: "50%" };

    switch (index) {
      case 2:
        config.begin = species ? 2 : 0;
        config.end = species ? 3 : 2;
        config.offset = species ? "50%" : "-50%";
        break;
      case 3:
        config.begin = 0;
        config.offset = "-50%";
        break;
    }

    setSidePosition.call(
      this,
      $allSides,
      config.begin,
      config.end,
      config.offset
    );
  } else {
    closeInside.call(this, this.GD_ITEMS);
    resetSidePosition.call(this);
  }
}
