import { render , screen } from "@testing-library/react"
import { TextInput } from "."
import React from "react";
import userEvent from "@testing-library/user-event";


describe('<TextInput />' , () => {
    it('Should have a value of searchValue' , () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} seachValue={'testando'}/>);

        const input = screen.getByPlaceholderText(/Type your search/i)
        expect(input).toBeInTheDocument()

        expect(input.value).toBe('testando');
    })

    it('Should call handleChange function on each key pressed' , () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} />);

        const input = screen.getByPlaceholderText(/Type your search/i);

        const value = 'o valor';

        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    })

    it('Should match snapshot' , () => {
        const fn = jest.fn();
        const { container } =render(<TextInput handleChange={fn}/>)

        expect(container.firstChild).toMatchSnapshot();
    })
})