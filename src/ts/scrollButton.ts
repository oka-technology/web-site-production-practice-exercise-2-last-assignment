import centerPositionOf from './modules/centerPositionOf';
import debounce from './modules/debounce';
{
  const imageSection = document.querySelectorAll<HTMLElement>('.topPageSection_withImg');
  const scrollPrevButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.prev',
  );
  const scrollNextButtons = document.querySelectorAll<HTMLElement>(
    '.topPageSection__scrollButtons__box.next',
  );

  const createPositionArr = () => {
    const sectionArr = Array.from(imageSection);
    const sectionPositionArr = sectionArr.map(
      (elem) => centerPositionOf(elem) - window.innerHeight / 2,
    );
    const end = document.body.clientHeight - window.innerHeight;
    return [0, ...sectionPositionArr, end];
  };

  let positionArr = createPositionArr();
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

  window.addEventListener(
    'resize',
    debounce(() => {
      positionArr = createPositionArr();
    }, 100),
  );
}
