import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccentRevealText from '../../components/core/AccentRevealText';

describe('AccentRevealText', () => {
  it('renders paragraph text', () => {
    render(<AccentRevealText text="Hello world from portfolio." />);
    expect(screen.getByText(/Hello world from portfolio/i)).toBeInTheDocument();
  });

  it('highlights configured phrases', () => {
    render(
      <AccentRevealText
        text="I am a software engineer with passion."
        highlights={['software engineer']}
      />
    );

    expect(screen.getByText('software engineer')).toHaveClass('font-semibold');
  });
});
