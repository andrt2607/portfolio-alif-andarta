import { scrollToSection, scrollToTop } from '../../lib/scrollToSection';

describe('scrollToSection', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('scrolls instantly to a section with header offset', () => {
    const element = document.createElement('section');
    element.id = 'about';
    document.body.appendChild(element);

    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 400,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    });

    scrollToSection('about');

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 420,
      behavior: 'auto',
    });

    document.body.removeChild(element);
  });

  it('scrolls to top instantly', () => {
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});
