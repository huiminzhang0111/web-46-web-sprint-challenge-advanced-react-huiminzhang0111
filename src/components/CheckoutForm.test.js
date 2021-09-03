import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen,  waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    const firstnameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstnameInput, "huimin");

    const lastnameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastnameInput, "zhang");

    const addressInput = screen.getByLabelText(/address/i);
    userEvent.type(addressInput, "123 abc street");

    const cityInput = screen.getByLabelText(/city/i);
    userEvent.type(cityInput, "bellevue");

    const stateInput = screen.getByLabelText(/state/i);
    userEvent.type(stateInput, "wa");

    const zipInput = screen.getByLabelText(/zip/i);
    userEvent.type(zipInput, "12345");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const submitFeedback = screen.queryAllByTestId('successMessage')
        const firstnameFeedback = screen.queryByText(/huimin/i);
        const lastnameFeedback = screen.queryByText(/zhang/i);
        const addressFeedback = screen.queryByText(/123 abc street/i);
        const cityFeedback = screen.queryByText(/bellevue/i);
        const stateFeedback = screen.queryByText(/wa/i);
        const zipFeedback = screen.queryByText(/12345/i);

        expect(submitFeedback).toHaveLength(1);
        expect(firstnameFeedback).toBeInTheDocument();
        expect(lastnameFeedback).toBeInTheDocument();
        expect(addressFeedback).toBeInTheDocument();
        expect(cityFeedback).toBeInTheDocument();
        expect(stateFeedback).toBeInTheDocument();
        expect(zipFeedback).toBeInTheDocument();
    })
});
