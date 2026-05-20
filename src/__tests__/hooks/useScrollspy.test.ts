import { renderHook, act } from '@testing-library/react';
import { useScrollspy } from '../../hooks/useScrollspy';

// Mock window methods
const mockGetBoundingClientRect = jest.fn();
const mockGetElementById = jest.fn();

Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
});

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: jest.fn(),
});

// Mock document.getElementById
Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: mockGetElementById,
});

describe('useScrollspy', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetElementById.mockClear();
    mockGetBoundingClientRect.mockClear();
  });

  it('should return empty string initially', () => {
    const { result } = renderHook(() => useScrollspy(['section1', 'section2']));
    expect(result.current).toBe('');
  });

  it('should add scroll event listener on mount', () => {
    renderHook(() => useScrollspy(['section1', 'section2']));
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });

  it('should remove scroll event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollspy(['section1', 'section2']));
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should set active section based on scroll position', () => {
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect,
    };

    mockGetElementById.mockReturnValue(mockElement);
    mockGetBoundingClientRect.mockReturnValue({ top: 50 });

    const { result } = renderHook(() => useScrollspy(['section1', 'section2'], 100));

    // Simulate scroll event
    const scrollListener = (window.addEventListener as jest.Mock).mock.calls[0][1];
    act(() => {
      scrollListener();
    });

    expect(result.current).toBe('section2');
  });

  it('should handle missing elements gracefully', () => {
    mockGetElementById.mockReturnValue(null);

    const { result } = renderHook(() => useScrollspy(['section1', 'section2']));

    // Simulate scroll event
    const scrollListener = (window.addEventListener as jest.Mock).mock.calls[0][1];
    act(() => {
      scrollListener();
    });

    expect(result.current).toBe('');
  });

  it('should use custom offset', () => {
    const mockElement = {
      getBoundingClientRect: mockGetBoundingClientRect,
    };

    mockGetElementById.mockReturnValue(mockElement);
    mockGetBoundingClientRect.mockReturnValue({ top: 150 });

    const { result } = renderHook(() => useScrollspy(['section1'], 200));

    // Simulate scroll event
    const scrollListener = (window.addEventListener as jest.Mock).mock.calls[0][1];
    act(() => {
      scrollListener();
    });

    expect(result.current).toBe('section1');
  });
});