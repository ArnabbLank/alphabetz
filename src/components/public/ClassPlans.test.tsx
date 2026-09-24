import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClassPlans } from './ClassPlans';
import { PLANS } from '@/lib/site-content';

describe('ClassPlans', () => {
  it('shows every programme before a filter is chosen', () => {
    render(<ClassPlans />);
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(PLANS.length);
    for (const p of PLANS) {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    }
  });

  it('marks "Show all" as the pressed filter initially', () => {
    render(<ClassPlans />);
    expect(screen.getByRole('button', { name: 'Show all' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('narrows to the chosen class group', async () => {
    const user = userEvent.setup();
    render(<ClassPlans />);

    await user.click(screen.getByRole('button', { name: 'Classes 9–10' }));

    // Both 9-10 programmes, plus Computer literacy which also covers that group.
    expect(screen.getByText('Madhyamik · Classes 9 to 10')).toBeInTheDocument();
    expect(screen.getByText('Secondary · Classes 9 to 10')).toBeInTheDocument();
    expect(screen.getByText('Computer literacy')).toBeInTheDocument();

    // Programmes for other groups must be gone, not merely dimmed.
    expect(screen.queryByText('Junior · Classes 1 to 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Middle school · Classes 5 to 8')).not.toBeInTheDocument();
  });

  it('moves the pressed state to the newly chosen filter', async () => {
    const user = userEvent.setup();
    render(<ClassPlans />);

    await user.click(screen.getByRole('button', { name: 'Classes 1–4' }));

    expect(screen.getByRole('button', { name: 'Classes 1–4' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Show all' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('restores the full list when Show all is chosen again', async () => {
    const user = userEvent.setup();
    render(<ClassPlans />);

    await user.click(screen.getByRole('button', { name: 'Classes 1–4' }));
    expect(screen.queryByText('Computer literacy')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show all' }));
    expect(screen.getByText('Computer literacy')).toBeInTheDocument();
  });

  it('formats fees with Indian digit grouping', () => {
    render(<ClassPlans />);
    // 1200 must render as ₹1,200 — the helper exists precisely for this
    expect(screen.getByText('₹1,200')).toBeInTheDocument();
  });

  it('labels the fees as placeholder, so nobody mistakes them for confirmed', () => {
    render(<ClassPlans />);
    expect(screen.getByText('Placeholder fees')).toBeInTheDocument();
  });
});
