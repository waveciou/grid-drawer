export default function controlSlide():Boolean {
  const { classNameInside } = this.CONFIG;

  Array.prototype.forEach.call(this.GD_ITEMS, (element: HTMLElement) => {
    const $inside: HTMLElement = element.querySelector(classNameInside);
    const isOpen: boolean = element.classList.contains('is-open');
    $inside.style.display = isOpen ? 'block' : 'none';
  });

  return false;
}