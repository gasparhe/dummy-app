## Author
Gaspar Hernández Estevan

## Demo
[Dummy App Demo](https://dummy-app-git-vercel-ssr-issues-gasparhes-projects.vercel.app)

## Documentation
[Project Documentation](https://deepwiki.com/gasparhe/dummy-app)

# Product Management Application

## Project Description
This application is a product management system developed with Angular 19.2.0, enabling CRUD operations (Create, Read, Update, Delete) on products through a modern and accessible user interface.

## Technologies Used
- Angular 19.2.0
- Angular Material
- TypeScript
- Cypress for e2e testing
- Jasmine for unit testing
- [DummyJSON API](https://dummyjson.com/) for backend

## Key Features
- Product form with complete validation
- Web accessibility implementation (ARIA)
- Responsive design applied for product list results
- Lazy loading implementation
- Server-Side Rendering (SSR) (Pre-rendering is disabled)
- Continuous Integration/Continuous Deployment (CI/CD) using GitHub Actions and Vercel

## Project Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI 19.2.0

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd dummy-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## Testing

### End-to-End Tests
To run the e2e tests:
```bash
npm run e2e
```

### Unit Tests
To run unit tests:
```bash
npm run test
```

## Additional Notes
- The application uses the public DummyJSON API to simulate a backend
- Network error interceptors have been implemented
- Tests are designed to be robust and maintain code quality

## Future Improvements
- Implementation of additional unit tests
- Improvement in test coverage
- Implementation of caching to optimize performance
- Addition of more accessibility features

To know more about technical decisions, please refer to the [technical-decisions.md](technical-decisions.md) file.