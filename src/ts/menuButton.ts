{
  const menuButton = document.querySelector<HTMLElement>('.menu__button');
  const menuList = document.querySelector<HTMLElement>('.menuList');

  const toggleOpening = () => {
    menuList?.classList.toggle('menuList--active');
    menuButton?.classList.toggle('menu__button--active');
    if (menuList?.classList.contains('menuList--active')) return;
    menuList?.classList.add('menuList--closing');
  };
  menuButton?.addEventListener('click', toggleOpening);

  menuList?.addEventListener('animationend', () => {
    if (!menuList.classList.contains('menuList--closing')) return;
    menuList.classList.remove('menuList--closing');
  });

  window.addEventListener('click', (e) => {
    if (!menuList?.classList.contains('menuList--active')) return;
    if (e.target === menuButton || e.target === menuList) return;
    toggleOpening();
  });
}
