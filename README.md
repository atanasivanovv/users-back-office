## Users Back Office

The Users Back Office is a web application built with React and TypeScript, designed to manage and display users, their posts, and tasks. It utilizes the JSONPlaceholder API for data retrieval and showcases a user-friendly interface with editable fields and robust state management.

![image](https://github.com/user-attachments/assets/e457bff6-4487-4b56-ab67-66d67e8eee9e)

### Getting Started

To run the application locally:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.

Visit `http://localhost:3000` in your browser to access the application.

### Features

- **User Management**: Fetches and displays a list of users with collapsible sections. Users can edit their information, with validation on mandatory fields, and can submit or revert changes.
- **Post Management**: Displays posts associated with a selected user, allowing editing and deletion with a confirmation prompt.
- **Task Management**: Provides a dedicated route to view tasks in a paginated table format. Users can filter tasks by status, title, and owner, and change task statuses with persistence.

### User Experience

- **Error and Loading States**: The application covers empty, error, and loading states, enhancing the user experience.
- **Simple and Aesthetic UI**: Aimed at creating a straightforward yet visually appealing interface.
- **Unit Tests**: The application includes unit tests to ensure functionality and reliability.

### Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Redux and Redux Toolkit**: State management library for predictable state management.
- **React Router**: Library for handling routing within the application.
- **JSONPlaceholder API**: Public API used for fetching user and post data.

