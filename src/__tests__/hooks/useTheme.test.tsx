import { renderHook } from '@testing-library/react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeProvider } from '../../contexts/ThemeContext';
import React from 'react';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('useTheme', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Reset document classes
    document.documentElement.className = '';
  });

  it('should throw error when used outside ThemeProvider', () => {
    // We expect this to throw an error, so we need to suppress console.error
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
    
    console.error = originalError;
  });

  it('should return theme context when used within ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('should have initial theme value', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(['light', 'dark']).toContain(result.current.theme);
  });
});