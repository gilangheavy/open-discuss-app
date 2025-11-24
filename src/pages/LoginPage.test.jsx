import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import authReducer from '../features/auth/authSlice';

// Helper to render with providers
const renderWithProviders = (
    component,
    {
        preloadedState = {},
        store = configureStore({
            reducer: { auth: authReducer },
            preloadedState,
        }),
        ...renderOptions
    } = {},
) => {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        );
    }
    return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
};

describe('LoginPage Integration Tests', () => {
    it('should render login form with all required fields', () => {
        renderWithProviders(<LoginPage />);

        expect(screen.getByText(/Selamat Datang Kembali/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/alamat email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
    });

    it('should have link to register page', () => {
        renderWithProviders(<LoginPage />);

        const registerLink = screen.getByRole('link', { name: /daftar sekarang/i });
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute('href', '/register');
    });

    it('should update input fields when user types', async () => {
        const user = userEvent.setup();
        renderWithProviders(<LoginPage />);

        const emailInput = screen.getByLabelText(/alamat email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should display error message when login fails', () => {
        const initialState = {
            auth: {
                authUser: null,
                status: 'failed',
                error: 'Email or password is wrong',
            },
        };

        renderWithProviders(<LoginPage />, { preloadedState: initialState });

        expect(screen.getByText(/Email or password is wrong/i)).toBeInTheDocument();
    });

    it('should show loading state during login', () => {
        const initialState = {
            auth: {
                authUser: null,
                status: 'loading',
                error: null,
            },
        };

        renderWithProviders(<LoginPage />, { preloadedState: initialState });

        expect(screen.getByText(/memproses/i)).toBeInTheDocument();
    });

    it('should disable submit button when loading', () => {
        const initialState = {
            auth: {
                authUser: null,
                status: 'loading',
                error: null,
            },
        };

        renderWithProviders(<LoginPage />, { preloadedState: initialState });

        const submitButton = screen.getByRole('button', { name: /memproses/i });
        expect(submitButton).toBeDisabled();
    });

    it('should have required attribute on email and password fields', () => {
        renderWithProviders(<LoginPage />);

        const emailInput = screen.getByLabelText(/alamat email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });
});
