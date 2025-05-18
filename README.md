## Author
Gaspar Hernández Estevan

# Product Management Application

## Project Description
This application is a product management system developed with Angular 19.2.0, enabling CRUD operations (Create, Read, Update, Delete) on products through a modern and accessible user interface.

## Technologies Used
- Angular 19.2.0
- Angular Material
- TypeScript
- Cypress for testing
- DummyJSON API for backend

## Key Features
- Product form with complete validation
- Web accessibility implementation (ARIA)
- Robust error handling
- End-to-end testing with Cypress
- Responsive and modern design

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
The project uses Cypress for end-to-end testing. The tests verify:
- Correct product form loading
- Field validation
- API error handling
- Complete product update flow

To run the tests:
```bash
npm run cypress:open
```

## Technical Decisions

### Architecture
- **Services**: Implementation of services to handle business logic and API calls
- **Components**: Modular design with reusable components
- **Reactive Forms**: Use of FormGroup for robust form handling

### Accessibility
- Complete implementation of ARIA attributes
- Error messages with role="alert"
- Descriptive labels for all fields
- Optimized keyboard navigation

### Patterns and Principles
- **SOLID**: Application of SOLID principles in code architecture
- **Clean Code**: Descriptive names, small functions, and self-documenting code
- **DRY**: Avoiding code duplication through reusable components and services

## Git Strategy

### Branching Strategy
- `master`: Production main branch
- `*`: Feature ang Bug fix branches

### Commit Conventions
```
feat: new feature
fix: bug fix
docs: documentation changes
test: add or modify tests
refactor: code refactoring
```

## AI Tools Usage

### Trae code editor
- Used for code completion and implementation suggestions

### ChatGPT
- Used for best practices consultation

## Additional Notes
- The application uses the public DummyJSON API to simulate a backend
- Network error interceptors have been implemented
- Tests are designed to be robust and maintain code quality

## Assumptions and Decisions
1. Angular Material was chosen to maintain a consistent and accessible UI
2. A centralized error handling system was implemented
3. Accessibility was prioritized from the initial design
4. End-to-end tests were chosen to ensure complete functionality

## Future Improvements
- Implementation of additional unit tests
- Improvement in test coverage
- Implementation of caching to optimize performance
- Addition of more accessibility features
