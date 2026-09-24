import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies the default variant when none is given', () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText('Neutral')).toHaveClass('bg-gray-100');
  });

  it('applies the requested variant', () => {
    render(<Badge variant="danger">Overdue</Badge>);
    expect(screen.getByText('Overdue')).toHaveClass('bg-red-100');
  });

  it('merges a caller className without dropping variant classes', () => {
    render(
      <Badge variant="success" className="ml-2">
        Paid
      </Badge>,
    );
    const el = screen.getByText('Paid');
    expect(el).toHaveClass('ml-2');
    expect(el).toHaveClass('bg-emerald-100');
  });
});
