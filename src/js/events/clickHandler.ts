// * Components
import controlAnimation from '../components/controlAnimation';
import controlSlide from '../components/controlSlide';

// * Tools
import getParents from '../utils/getParents';

export default function clickHandler(e: MouseEvent) {
  const isAnimating = Array.prototype.some.call(this.GD_INSIDES, (element: HTMLElement) => {
    return element.classList.contains('velocity-animating') === true;
  });

  if (isAnimating) return false;

  const { classNameOutside } = this.CONFIG;
  const element = (e.target as HTMLElement);
  const $item: HTMLElement = getParents(element, 'gd__item');

  const className_OPENING = 'gd__is-open';
  this.GD_CONTAINER.classList.remove(className_OPENING);

  if (element.closest(classNameOutside)) {
    if ($item.classList.contains('is-open')) {
      $item.classList.remove('is-open');
    } else {
      for (let i = 0; i < this.GD_ITEMS.length; i++) {
        (<HTMLElement>this.GD_ITEMS[i]).classList.remove('is-open');
      }
      $item.classList.add('is-open');
      this.GD_CONTAINER.classList.add(className_OPENING);
    }
  } else if (element.classList.contains('close-btn')) {
    $item.classList.remove('is-open');
  } else {
    return false;
  }

  window.innerWidth > 1024 ? controlAnimation.call(this, $item) : controlSlide.call(this);
  return false;
}