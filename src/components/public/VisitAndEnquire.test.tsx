import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitAndEnquire } from './VisitAndEnquire';

const submit = () => screen.getByRole('button', { name: /request a callback/i });

describe('VisitAndEnquire', () => {
  it('rejects an empty name', async () => {
    const user = userEvent.setup();
    render(<VisitAndEnquire />);

    await user.click(submit());

    expect(screen.getByRole('status')).toHaveTextContent(/please add a name/i);
  });

  it('rejects a number shorter than ten digits', async () => {
    const user = userEvent.setup();
    render(<VisitAndEnquire />);

    await user.type(screen.getByLabelText(/student or parent name/i), 'Test Parent');
    await user.type(screen.getByLabelText(/mobile number/i), '12345');
    await user.click(submit());

    expect(screen.getByRole('status')).toHaveTextContent(/looks short/i);
  });

  it('ignores non-digits when counting the number length', async () => {
    const user = userEvent.setup();
    render(<VisitAndEnquire />);

    await user.type(screen.getByLabelText(/student or parent name/i), 'Test Parent');
    // Spaces and dashes are how people actually type phone numbers.
    await user.type(screen.getByLabelText(/mobile number/i), '98765 43210');
    await user.click(submit());

    expect(screen.getByRole('status')).toHaveTextContent(/we will call you/i);
  });

  it('confirms and disables the button on a valid submission', async () => {
    const user = userEvent.setup();
    render(<VisitAndEnquire />);

    await user.type(screen.getByLabelText(/student or parent name/i), 'Test Parent');
    await user.type(screen.getByLabelText(/mobile number/i), '9876543210');
    await user.click(submit());

    const btn = screen.getByRole('button', { name: /thank you/i });
    expect(btn).toBeDisabled();
  });

  it('states up front that nothing is actually stored yet', () => {
    render(<VisitAndEnquire />);
    expect(screen.getByRole('status')).toHaveTextContent(/placeholder form/i);
  });

  it('exposes the phone number as a tel link', () => {
    render(<VisitAndEnquire />);
    expect(screen.getByRole('link', { name: /089007 62900/ })).toHaveAttribute(
      'href',
      'tel:+918900762900',
    );
  });
});
