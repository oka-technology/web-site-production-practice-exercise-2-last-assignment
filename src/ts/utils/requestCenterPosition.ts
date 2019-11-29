import requestOffsetTop from './requestOffsetTop';

const requestCenterPosition = (elem: HTMLElement): number =>
  elem.offsetHeight / 2 + requestOffsetTop(elem);

export default requestCenterPosition;
