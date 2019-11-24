import centerPositionOf from './modules/centerPositionOf';
import debounce from './modules/debounce';
{
  const bmwSection = document.querySelector<HTMLElement>('.topPageSection_bmw');
  const imageSection = document.querySelectorAll<HTMLElement>('.topPageSection_withImg');
  const scrollPrevButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.prev',
  );
  const scrollNextButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.next',
  );
  const continueButton = document.querySelector<HTMLElement>(
    '.topPageSection_main .topPageSection__description__button',
  );

  const scrollPositionOf = (elem: HTMLElement) =>
    centerPositionOf(elem) - window.innerHeight / 2;

  const createPositionArr = () => {
    const sectionArr = Array.from(imageSection);
    const sectionPositionArr = sectionArr.map((elem) => scrollPositionOf(elem));
    const start = bmwSection ? scrollPositionOf(bmwSection) : 0;
    const end = document.body.clientHeight - window.innerHeight;
    return [start, ...sectionPositionArr, end];
  };

  let positionArr = createPositionArr();

  window.addEventListener(
    'resize',
    debounce(() => {
      positionArr = createPositionArr();
    }, 100),
  );

  const indexOffset = 1;
  const scrollFunc = (index: number, direction: -1 | 1) => {
    const i = index + indexOffset + direction;
    return (e: Event) => {
      e.preventDefault();
      window.scroll({
        top: positionArr[i],
        behavior: 'smooth',
      });
    };
  };

  scrollPrevButtons.forEach((elem, i) => {
    elem.addEventListener('click', scrollFunc(i, -1));
  });
  scrollNextButtons.forEach((elem, i) => {
    elem.addEventListener('click', scrollFunc(i, 1));
  });

  (() => {
    if (!bmwSection) return;
    let firstImgSectionPosition = scrollPositionOf(bmwSection);
    window.addEventListener(
      'resize',
      debounce(() => {
        firstImgSectionPosition = scrollPositionOf(bmwSection);
      }, 100),
    );
    continueButton?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scroll({
        top: firstImgSectionPosition,
        behavior: 'smooth',
      });
    });
  })();
}
