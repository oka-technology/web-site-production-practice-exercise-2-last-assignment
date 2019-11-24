{
  const menuButton = document.querySelectorAll<HTMLElement>('.menu__button');
  const menuLinks = document.querySelectorAll<HTMLAnchorElement>(
    '.menuList__item__anchor',
  );
  const allMenuItems = document.querySelectorAll<HTMLElement>('.menu, .menu *');
  let shouldCloseMenu = true;

  const toggleActive = (targetNodeList: NodeListOf<HTMLElement>) => {
    return () => {
      targetNodeList.forEach((elem) => {
        elem.classList.toggle(`${elem.classList.item(0)}--active`);
      });
    };
  };

  menuButton.forEach((menuButtonElem) => {
    menuButtonElem.addEventListener('click', toggleActive(allMenuItems));
  });

  menuLinks.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const invaild = !elem.classList.contains('menuList__item__anchor--active');
      if (invaild) {
        e.preventDefault();
      }
    });
  });

  window.addEventListener('click', (e) => {
    allMenuItems.forEach((elem) => {
      if (elem === e.target) {
        shouldCloseMenu = false;
      }
    });
    if (shouldCloseMenu) {
      allMenuItems.forEach((elem) => {
        elem.classList.remove(`${elem.classList[0]}--active`);
      });
    }
    shouldCloseMenu = true;
  });
}
