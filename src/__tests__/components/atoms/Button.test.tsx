import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from 'components/atoms/Button';


describe('Button render', () => {
    const label = "Yeah"
    const onClick = jest.fn()
    beforeEach(() => {
        render(<Button label={label} onClick={onClick} />)
    })
    it('should display the texts given', () => {
        expect(screen.getAllByText(label)).toHaveLength(1)
    })
});


describe('Button interaction', () => {
    const label = "Yeah"
    const onClick = jest.fn()
    beforeEach(() => {
        render(<Button label={label} onClick={onClick} />)
    });
    it('should call the callback given when button is pressed', async () => {
        fireEvent.click(screen.getByText(label));
        expect(onClick).toHaveBeenCalledTimes(1)
    });
});