# Blog System with Country API Integration

A fully functional blog system built with React.js that integrates with the REST Countries API.

## Features

- **List of Blogs**: Display a list of blog posts with relevant information
- **Blog Details**: View detailed information about a selected blog post
- **Comments**: Add and view comments on blog posts
- **Likes**: Like blog posts to show appreciation
- **Search/Filter**: Search for blogs or filter by tags
- **User Authentication**: Basic login/register functionality

## Technologies Used

- React.js
- React Router DOM for navigation
- Context API for state management
- REST Countries API for data
- CSS for styling

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nknitish9/blog_system.git
   cd blog-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`


## API Integration

This project transforms country data from the REST Countries API into blog posts:
- Each country becomes a blog post with details about the country
- Uses the country's flag as the blog post image
- Adds mock likes and comments functionality

## Authentication

The authentication in this project is purely for demonstration purposes:
- Login credentials: email: `user@example.com`, password: `password`
- No actual backend authentication is implemented

## Future Enhancements

- Implement a backend API for real data persistence
- Add user profiles and avatar support
- Implement categories and related post recommendations
- Add a WYSIWYG editor for blog post creation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).