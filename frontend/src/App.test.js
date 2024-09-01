import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App';

// test('renders the Admin Dashboard', () => {
//   render(
//     <Router>
//       <App />
//     </Router>
//   );
//   const dashboardElement = screen.getByText(/Admin Dashboard/i);
//   expect(dashboardElement).toBeInTheDocument();
// });

// test('renders the User Profile after login', () => {
//   render(
//     <Router>
//       <App />
//     </Router>
//   );
//   const profileElement = screen.getByText(/User Profile/i);
//   expect(profileElement).toBeInTheDocument();
// });

// test('renders the Questions page', () => {
//   render(
//     <Router>
//       <App />
//     </Router>
//   );
//   const questionsElement = screen.getByText(/All Questions/i);
//   expect(questionsElement).toBeInTheDocument();
// });

