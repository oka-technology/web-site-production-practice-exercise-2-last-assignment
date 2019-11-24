import offSetTopOf from './offsetTopOf';

const centerPositionOf = (elem: HTMLElement): number =>
  elem.offsetHeight / 2 + offSetTopOf(elem);

export default centerPositionOf;
