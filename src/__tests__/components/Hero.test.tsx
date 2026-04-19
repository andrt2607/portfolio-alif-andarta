import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../../components/Hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock SplitText to simply render the text prop
jest.mock('../../components/core/SplitText', () => ({
  __esModule: true,
  default: ({ text, className }: any) => <p className={className}>{text}</p>,
}));

// Mock typewriter-effect to immediately call onInit with a chainable mock typewriter
jest.mock('typewriter-effect', () => ({
  __esModule: true,
  default: ({ onInit }: any) => {
    const mockTypewriter = {
      typeString: jest.fn().mockReturnThis(),
      pauseFor: jest.fn().mockReturnThis(),
      start: jest.fn().mockReturnThis(),
    };
    if (onInit) {
      onInit(mockTypewriter);
    }
    return null;
  },
}));

// Mock scrollIntoView on Element prototype
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.getElementById = jest.fn().mockImplementation((id: string) => {
      const el = document.createElement('div');
      el.id = id;
      return el;
    });
  });

  it('renders without crashing', () => {
    render(<Hero />);
    expect(screen.getByRole('region', { hidden: true }) ?? document.querySelector('section#home')).toBeTruthy();
  });

  it('renders the hardcoded name "Hi, I\'m Alif Andarta"', () => {
    render(<Hero />);
    expect(screen.getByText("Hi, I'm Alif Andarta")).toBeInTheDocument();
  });

  it('does not render a loading state', () => {
    render(<Hero />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('does not render an error state', () => {
    render(<Hero />);
    expect(screen.queryByText('Failed to load profile.')).not.toBeInTheDocument();
  });

  it('renders the "View My Work" button', () => {
    render(<Hero />);
    expect(screen.getByText('View My Work')).toBeInTheDocument();
  });

  it('renders the "Get In Touch" button', () => {
    render(<Hero />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders the statistics section with years of experience', () => {
    render(<Hero />);
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('renders the statistics section with projects completed', () => {
    render(<Hero />);
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
  });

  it('renders the statistics section with client satisfaction', () => {
    render(<Hero />);
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
  });

  it('renders the hero section with id="home"', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section#home');
    expect(section).toBeInTheDocument();
  });

  it('calls scrollToSection("portfolio") when "View My Work" is clicked', () => {
    render(<Hero />);
    const button = screen.getByText('View My Work');
    fireEvent.click(button);
    expect(document.getElementById).toHaveBeenCalledWith('portfolio');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('calls scrollToSection("contact") when "Get In Touch" is clicked', () => {
    render(<Hero />);
    const button = screen.getByText('Get In Touch');
    fireEvent.click(button);
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('calls scrollToSection("about") when the scroll indicator button is clicked', () => {
    const { container } = render(<Hero />);
    // The scroll indicator is the absolute-positioned button at the bottom
    const buttons = screen.getAllByRole('button');
    const scrollIndicatorButton = buttons[buttons.length - 1];
    fireEvent.click(scrollIndicatorButton);
    expect(document.getElementById).toHaveBeenCalledWith('about');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does not call scrollIntoView when element is not found', () => {
    document.getElementById = jest.fn().mockReturnValue(null);
    render(<Hero />);
    const button = screen.getByText('View My Work');
    fireEvent.click(button);
    expect(document.getElementById).toHaveBeenCalledWith('portfolio');
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('passes the hardcoded description text to Typewriter', () => {
    // Since Typewriter mock calls onInit, verify description text is attempted
    // via the typeString mock. We capture it by spying on the mock module.
    const TypewriterMock = require('typewriter-effect').default;
    const capturedTypeStrings: string[] = [];
    TypewriterMock.mockImplementationOnce
      ? undefined
      : undefined;

    // Re-render with a spy on typeString to verify content
    let capturedString = '';
    jest.spyOn(require('typewriter-effect'), 'default').mockImplementationOnce(({ onInit }: any) => {
      const mockTypewriter = {
        typeString: jest.fn().mockImplementation((s: string) => {
          capturedString = s;
          return mockTypewriter;
        }),
        pauseFor: jest.fn().mockReturnThis(),
        start: jest.fn().mockReturnThis(),
      };
      if (onInit) {
        onInit(mockTypewriter);
      }
      return null;
    });

    render(<Hero />);
    expect(capturedString).toContain('Turning creative ideas into reality');
  });

  it('renders the section with the correct background gradient classes', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section#home');
    expect(section).toHaveClass('min-h-screen');
  });

  // Regression test: Hero no longer depends on useProfile context
  it('renders independently without any profile context provider', () => {
    // If useProfile were still used, this would throw since no provider wraps Hero.
    // The fact that it renders without error confirms the dependency was removed.
    expect(() => render(<Hero />)).not.toThrow();
  });
});