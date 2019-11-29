import requestCenterPosition from './utils/requestCenterPosition';
import debounce from './utils/debounce';
{
  interface ElementInfo {
    element: HTMLElement;
    shiftLength: number;
    centerPosition: number;
  }

  (() => {
    const PARALLAX_DEGREE = 0.3;
    const parallaxTargetElements = document.querySelectorAll<HTMLElement>('.parallax');

    if (/Safari/g.test(navigator.userAgent) && document.ontouchstart !== undefined) {
      parallaxTargetElements.forEach((element) => {
        element.classList.remove('parallax');
      });
      return;
    }

    const elementInfoList = Array.from<HTMLElement, ElementInfo>(
      parallaxTargetElements,
      (element) => ({
        element,
        shiftLength: 0,
        centerPosition: requestCenterPosition(element),
      }),
    );
    let shouldUpdate = true;

    const updateShiftLength = () => {
      shouldUpdate = true;
      const currCenterPosition = window.scrollY + window.innerHeight / 2;
      elementInfoList.forEach((elementInfo) => {
        elementInfo.shiftLength =
          (elementInfo.centerPosition - currCenterPosition) * PARALLAX_DEGREE;
      });
    };
    updateShiftLength();
    window.addEventListener('scroll', updateShiftLength);
    window.addEventListener('resize', debounce(updateShiftLength, 200));

    const updateCenterPosition = () => {
      shouldUpdate = true;
      elementInfoList.forEach((elementInfo) => {
        elementInfo.centerPosition = requestCenterPosition(elementInfo.element);
      });
    };
    window.addEventListener('resize', debounce(updateCenterPosition, 100));

    const update = () => {
      if (shouldUpdate) {
        elementInfoList.forEach((elementInfo) => {
          elementInfo.element.style.backgroundPosition = `center ${elementInfo.shiftLength}px`;
        });
        shouldUpdate = false;
      }
      requestAnimationFrame(update);
    };
    update();
  })();
}
