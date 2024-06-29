# M360IT Task

This project is a React application using Typescript, React Router, Redux Toolkit, RTK Query, and Ant Design for managing and displaying product information.

## Features

- **Product List View:**

  - Fetches product data from an API endpoint (`https://dummyjson.com/products`) using RTK Query.
  - Displays products in a paginated table using Ant Design's Table component.
  - Includes a button to navigate to each product's detail view.

- **Product Detail View:**

  - Displays detailed information of a selected product fetched from (`https://dummyjson.com/products/:id`) using RTK Query.
  - Custom design using CSS and Ant Design components.

- **Edit Product:**
  - Implements a form using Ant Design's Form component to update product details.
  - Fetches product details from (`https://dummyjson.com/products/:id`) using RTK Query.
  - Supports dynamic addition and removal of reviews using Ant Design's Form.List.
  - Includes a Select component populated from (`https://dummyjson.com/products/categories`) for category selection.
  - Submits edited product data via PATCH request to (`https://dummyjson.com/products/:id`) and logs the output.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/md-rasel-mahmud/m360ict-task
   cd m360ict-task
   ```
2. **Install Dependency:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

4. **Open in your browser:**
   Open http://localhost:3000 to view the project.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Typescript:** TypeScript is a syntactic superset of JavaScript which adds static typing.
- **React Router:** React Router, is your essential routing tool for building single-page applications (SPAs).
- **Redux Toolkit:** State management library for React applications.
- **RTK Query:** Data fetching and caching library built on Redux Toolkit.
- **Ant Design:** Design system with React components for UI.
