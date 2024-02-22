import Popover from '../Popover/Popover';

describe('popover', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should render self', () => {
    const popover = new Popover();
    popover.bindToDOM(container);
    expect(container.innerHTML).toEqual(Popover.markUp);
  });

  test('isBound should return false when _container is null', () => {
    const popover = new Popover();
    expect(popover.isBound()).toBe(false);
  });

  test('isBound should return true when _container is not null', () => {
    const popover = new Popover();
    popover.bindToDOM(document.createElement('div'));
    expect(popover.isBound()).toBe(true);
  });

  test('setEventListeners should attach click event to button', () => {
    const popover = new Popover();
    popover.bindToDOM(document.createElement('div'));
    const btn = popover._container.querySelector('.btn');

    const onClickMock = jest
      .spyOn(popover, 'onClick')
      .mockImplementation(jest.fn());

    btn.click();

    expect(onClickMock).toHaveBeenCalled();

    onClickMock.mockRestore();
  });
});
