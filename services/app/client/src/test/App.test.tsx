import { render, screen } from '@testing-library/react';
import App from '../App/App';

test('Renders the application.', () => {
	render(<App />);

	const applicationContainer = screen.getByRole('application');

	expect(applicationContainer).toBeInTheDocument();
});
