import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { ScrollProvider, useScroll } from '../../contexts/ScrollContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ScrollProvider>{children}</ScrollProvider>
);

const flushScrollFrame = async () => {
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
};

describe('ScrollContext', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
    document.body.classList.remove('is-scrolling');
  });

  it('exposes FAB visibility based on scroll threshold', async () => {
    window.scrollY = 100;
    const { result } = renderHook(() => useScroll(), { wrapper });
    await flushScrollFrame();
    expect(result.current.isFabVisible).toBe(false);

    await act(async () => {
      window.scrollY = 350;
      window.dispatchEvent(new Event('scroll'));
    });
    await flushScrollFrame();

    expect(result.current.isFabVisible).toBe(true);
  });

  it('marks body as scrolling during scroll events', async () => {
    renderHook(() => useScroll(), { wrapper });

    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
    });
    await flushScrollFrame();

    expect(document.body.classList.contains('is-scrolling')).toBe(true);
  });
});
