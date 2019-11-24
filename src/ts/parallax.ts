import centerPositionOf from './modules/centerPositionOf';
{
  const PARALLAX_DEGREE = 0.3;
  const parallaxElems = document.querySelectorAll<HTMLElement>('.parallax');
  let shouldUpdate = true;
  const currLengthArr = Array.from<number>({ length: parallaxElems.length });

  const updateBgPosition = () => {
    shouldUpdate = true;
    const currPosition = window.scrollY + window.innerHeight / 2;
    parallaxElems.forEach((elem, i) => {
      const shiftLength: number =
        (centerPositionOf(elem) - currPosition) * PARALLAX_DEGREE;
      currLengthArr[i] = shiftLength;
    });
  };

  const update = () => {
    if (shouldUpdate) {
      parallaxElems.forEach((elem, i) => {
        elem.style.backgroundPosition = `center ${currLengthArr[i]}px`;
      });
      shouldUpdate = false;
    }
    requestAnimationFrame(update);
  };

  updateBgPosition();
  requestAnimationFrame(update);
  window.addEventListener('scroll', updateBgPosition);
}
