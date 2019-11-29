import requestCenterPosition from './utils/requestCenterPosition';
{
  const FADEIN_PADDING = 100;
  const fadeinElems = document.querySelectorAll<HTMLElement>('.fadein');

  const show = (elem: HTMLElement) => {
    elem.classList.add('fadein--visible');
    elem.classList.remove('fadein');
  };
  const hide = (elem: HTMLElement) => {
    elem.classList.add('fadein');
    elem.classList.remove('fadein--visible');
  };

  const updateVisibility = () => {
    const top = window.scrollY;
    const bottom = window.scrollY + window.innerHeight;
    fadeinElems.forEach((elem) => {
      const centerPosition = requestCenterPosition(elem);
      if (
        centerPosition > top + FADEIN_PADDING &&
        centerPosition < bottom - FADEIN_PADDING
      ) {
        show(elem);
      } else {
        hide(elem);
      }
    });
  };

  updateVisibility();
  window.addEventListener('scroll', updateVisibility);
}
