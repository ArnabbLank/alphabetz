import { describe, it, expect } from 'vitest';
import {
  isAlwaysOpen,
  isAuthorised,
  isGateEnabled,
  parseBasicAuth,
  safeEqual,
} from './preview-gate';

const basic = (user: string, pass: string) => `Basic ${btoa(`${user}:${pass}`)}`;

describe('isGateEnabled', () => {
  it('is off when the variable is unset, so local dev and CI are unaffected', () => {
    expect(isGateEnabled(undefined)).toBe(false);
  });

  it('is off for an empty string rather than gating with a blank password', () => {
    expect(isGateEnabled('')).toBe(false);
  });

  it('is on once a password is present', () => {
    expect(isGateEnabled('hunter2')).toBe(true);
  });
});

describe('parseBasicAuth', () => {
  it('returns null with no header', () => {
    expect(parseBasicAuth(null)).toBeNull();
  });

  it('rejects a non-Basic scheme', () => {
    expect(parseBasicAuth('Bearer abc123')).toBeNull();
  });

  it('accepts a lowercase scheme, since clients vary', () => {
    expect(parseBasicAuth(`basic ${btoa('a:b')}`)).toEqual({ user: 'a', pass: 'b' });
  });

  it('returns null on undecodable base64 instead of throwing', () => {
    expect(parseBasicAuth('Basic !!!not-base64!!!')).toBeNull();
  });

  it('returns null when the decoded value has no colon', () => {
    expect(parseBasicAuth(`Basic ${btoa('nocolon')}`)).toBeNull();
  });

  it('keeps colons that belong to the password', () => {
    expect(parseBasicAuth(basic('user', 'pa:ss:word'))).toEqual({
      user: 'user',
      pass: 'pa:ss:word',
    });
  });

  it('tolerates an empty username', () => {
    expect(parseBasicAuth(basic('', 'secret'))).toEqual({ user: '', pass: 'secret' });
  });
});

describe('safeEqual', () => {
  it('matches identical strings', () => {
    expect(safeEqual('abc', 'abc')).toBe(true);
  });

  it('rejects differing strings of equal length', () => {
    expect(safeEqual('abc', 'abd')).toBe(false);
  });

  it('rejects differing lengths', () => {
    expect(safeEqual('abc', 'abcd')).toBe(false);
  });

  it('rejects a correct prefix, which is the attack it guards against', () => {
    expect(safeEqual('secret', 'sec')).toBe(false);
  });
});

describe('isAuthorised', () => {
  const expected = 'let-me-in';

  it('denies a request with no credentials', () => {
    expect(isAuthorised(null, expected)).toBe(false);
  });

  it('denies a wrong password', () => {
    expect(isAuthorised(basic('anyone', 'wrong'), expected)).toBe(false);
  });

  it('allows the correct password under any username', () => {
    expect(isAuthorised(basic('swaraj', expected), expected)).toBe(true);
    expect(isAuthorised(basic('someone-else', expected), expected)).toBe(true);
  });

  it('is case-sensitive on the password', () => {
    expect(isAuthorised(basic('u', 'LET-ME-IN'), expected)).toBe(false);
  });

  it('denies an empty password even if the header is well formed', () => {
    expect(isAuthorised(basic('u', ''), expected)).toBe(false);
  });
});

describe('isAlwaysOpen', () => {
  it('leaves robots.txt reachable so a gated deploy can still say "do not index"', () => {
    expect(isAlwaysOpen('/robots.txt')).toBe(true);
  });

  it('gates ordinary pages', () => {
    expect(isAlwaysOpen('/')).toBe(false);
    expect(isAlwaysOpen('/results')).toBe(false);
    expect(isAlwaysOpen('/admin/dashboard')).toBe(false);
  });
});
