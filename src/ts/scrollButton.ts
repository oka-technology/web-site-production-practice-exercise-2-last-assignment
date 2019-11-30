import requestCenterPosition from './utils/requestCenterPosition';
import debounce from './utils/debounce';
{
  const bmwSection = document.querySelector<HTMLElement>('.topPageSection_bmw');
  const imageSections = document.querySelectorAll<HTMLElement>('.topPageSection_withImg');
  const scrollPrevButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.prev',
  );
  const scrollNextButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.next',
  );
  const continueButton = document.querySelector<HTMLElement>(
    '.topPageSection_main .topPageSection__description__button',
  );

  const requestScrollPosition = (elem: HTMLElement) =>
    requestCenterPosition(elem) - window.innerHeight / 2;

  const createPositionArr = () => {
    const imageSectionList = Array.from(imageSections);
    const sectionPositionList = imageSectionList.map((elem) =>
      requestScrollPosition(elem),
    );
    const start = bmwSection ? requestScrollPosition(bmwSection) : 0;
    const end = document.body.clientHeight - window.innerHeight;
    return [start, ...sectionPositionList, end];
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
    let firstImgSectionPosition = requestScrollPosition(bmwSection);
    window.addEventListener(
      'resize',
      debounce(() => {
        firstImgSectionPosition = requestScrollPosition(bmwSection);
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
