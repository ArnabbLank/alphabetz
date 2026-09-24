import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  cn,
  formatDate,
  formatCurrency,
  getInitials,
  truncate,
  getRelativeTime,
} from './utils';

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('drops every falsy input rather than emitting "false" or "undefined"', () => {
    expect(cn('a', undefined, null, false, 0, 'b')).toBe('a b');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cn(undefined, false)).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formats with the Indian digit grouping, not the western one', () => {
    // 1,00,000 rather than 100,000 — this is the whole reason the helper exists
    expect(formatCurrency(100000)).toBe('₹1,00,000');
  });

  it('handles values below the grouping threshold', () => {
    expect(formatCurrency(600)).toBe('₹600');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });
});

describe('formatDate', () => {
  it('renders as DD MMM YYYY', () => {
    expect(formatDate('2026-03-15T10:00:00Z')).toMatch(/^\d{2} Mar 2026$/);
  });

  it('zero-pads single-digit days', () => {
    expect(formatDate('2026-03-05T10:00:00Z')).toMatch(/^0\d Mar 2026$/);
  });
});

describe('getInitials', () => {
  it('takes first and last initials', () => {
    expect(getInitials('Rahul Sharma')).toBe('RS');
  });

  it('strips an honorific before deriving initials', () => {
    expect(getInitials('Dr. Subhash Banerjee')).toBe('SB');
  });

  it('falls back to a single letter for a mononym', () => {
    expect(getInitials('Swaraj')).toBe('S');
  });

  it('ignores the middle name', () => {
    expect(getInitials('Khusboo Singh Rai')).toBe('KR');
  });
});

describe('truncate', () => {
  it('leaves a short string untouched', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('appends an ellipsis and trims the trailing space', () => {
    expect(truncate('Hello World', 6)).toBe('Hello...');
  });

  it('treats an exact-length string as short enough', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

describe('getRelativeTime', () => {
  afterEach(() => vi.useRealTimers());

  const at = (iso: string) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-15T12:00:00Z'));
    return getRelativeTime(iso);
  };

  it('reports seconds as "just now"', () => {
    expect(at('2026-06-15T11:59:30Z')).toBe('just now');
  });

  it('singularises one minute', () => {
    expect(at('2026-06-15T11:59:00Z')).toBe('1 minute ago');
  });

  it('pluralises multiple hours', () => {
    expect(at('2026-06-15T09:00:00Z')).toBe('3 hours ago');
  });

  it('reports days under a week', () => {
    expect(at('2026-06-12T12:00:00Z')).toBe('3 days ago');
  });

  it('treats a future date as "just now" instead of a negative duration', () => {
    expect(at('2026-06-16T12:00:00Z')).toBe('just now');
  });
});
