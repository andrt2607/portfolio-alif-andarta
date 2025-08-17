import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Header from '../../components/Header';
import { useProfile } from '../../contexts/useProfile';

// Mock the hooks and contexts
jest.mock('../../hooks/useScrollspy', () => ({
  useScrollspy: jest.fn(() => 'home'),
}));

jest.mock('../../contexts/useProfile', () => ({
  useProfile: jest.fn(() => ({
    profile: {
      github_account: 'https://github.com/test',
      linkedin_account: 'https://linkedin.com/in/test',
    },
    loading: false,
    error: null,
  })),
}));

// Mock framer-motion to avoid animation props issues
jest.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock window methods
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

const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

describe('Header', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Reset the useProfile mock to default state
    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        github_account: 'https://github.com/test',
        linkedin_account: 'https://linkedin.com/in/test',
      },
      loading: false,
      error: null,
    });
  });

  it('renders header component', () => {
    renderWithTheme(<Header />);
    // Use getAllByText since Portfolio appears multiple times (logo and nav item)
    const portfolioElements = screen.getAllByText('Portfolio');
    expect(portfolioElements.length).toBeGreaterThan(0);
  });

  it('renders navigation items', () => {
    renderWithTheme(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    renderWithTheme(<Header />);
    // Look for buttons that might be the theme toggle
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('shows loading state', () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
      loading: true,
      error: null,
    });

    renderWithTheme(<Header />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: null,
      loading: false,
      error: 'Failed to load',
    });

    renderWithTheme(<Header />);
    expect(screen.getByText('Failed to load profile.')).toBeInTheDocument();
  });

  it('scrolls to section when navigation item is clicked', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.getElementById = jest.fn().mockReturnValue(mockElement);
    
    renderWithTheme(<Header />);
    
    const aboutButton = screen.getByText('About');
    fireEvent.click(aboutButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('renders social media links when profile is loaded', () => {
    renderWithTheme(<Header />);
    
    // Check for links in the document
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});