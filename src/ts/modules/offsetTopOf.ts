const offSetTopOf = (elem: HTMLElement): number => {
  let offsetTop = 0;
  let target: HTMLElement | null = elem;
  while (target) {
    offsetTop += target.offsetTop;
    target = target.offsetParent as HTMLElement;
  }
  return offsetTop;
};

export default offSetTopOf;
