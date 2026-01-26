import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Counter } from '../components/Counter';

describe('Counter', () => {
  it('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('Value: 5')).toBeInTheDocument();
  });

  it('renders with default initial value of 0', () => {
    render(<Counter />);
    expect(screen.getByText('Value: 0')).toBeInTheDocument();
  });

  it('increments by default step of 1', () => {
    render(<Counter initialValue={0} />);
    const incrementButton = screen.getByLabelText('Increase value');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });

  it('increments by custom step', () => {
    render(<Counter initialValue={0} step={5} />);
    const incrementButton = screen.getByLabelText('Increase value');
    fireEvent.click(incrementButton);
    expect(screen.getByText('Value: 5')).toBeInTheDocument();
  });

  it('decrements by default step of 1', () => {
    render(<Counter initialValue={5} />);
    const decrementButton = screen.getByLabelText('Decrease value');
    fireEvent.click(decrementButton);
    expect(screen.getByText('Value: 4')).toBeInTheDocument();
  });

  it('decrements by custom step', () => {
    render(<Counter initialValue={10} step={3} />);
    const decrementButton = screen.getByLabelText('Decrease value');
    fireEvent.click(decrementButton);
    expect(screen.getByText('Value: 7')).toBeInTheDocument();
  });

  it('resets to initial value', () => {
    render(<Counter initialValue={10} />);
    const incrementButton = screen.getByLabelText('Increase value');
    const resetButton = screen.getByLabelText('Reset value');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText('Value: 12')).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(screen.getByText('Value: 10')).toBeInTheDocument();
  });

  it('handles multiple increments', () => {
    render(<Counter initialValue={0} />);
    const incrementButton = screen.getByLabelText('Increase value');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(screen.getByText('Value: 3')).toBeInTheDocument();
  });

  it('handles multiple decrements', () => {
    render(<Counter initialValue={5} />);
    const decrementButton = screen.getByLabelText('Decrease value');

    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);

    expect(screen.getByText('Value: 3')).toBeInTheDocument();
  });

  it('allows negative values', () => {
    render(<Counter initialValue={0} />);
    const decrementButton = screen.getByLabelText('Decrease value');

    fireEvent.click(decrementButton);
    expect(screen.getByText('Value: -1')).toBeInTheDocument();
  });
});
