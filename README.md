## Simple user management powered by React

A simple example of how users can be managed with [React](https://react.dev/). This UI allows users to be listed, added, edited, and deleted. There is no password or login handling. This is similar to to-do apps.

This was part of my job search process, but I think this is also a good example for new coders on how to create basic user management for the frontend.

I have used [MUI - Material Design React Framework](https://mui.com/) in previous React projects, so I used its components here as well. As far as I know, it is one of the most popular React component libraries.

[Web App](https://timoanttila.github.io/react-user-management/)

## Features

- A paginated and sortable table of 20 user objects with a random ID and phone number.
- Form for creating a new user.
- Modal and form for editing the current user.
- Both forms' submit buttons are disabled if the length of the fields is not valid.
- Snackbar + alert for messages.
- Email validation.
- TypeScript support.

## Available Scripts

In the project directory, you can run:

```Shell
yarn && yarn start
```

Runs the app in the development mode.  
Open [http://localhost:3000/react-user-management](http://localhost:3000/react-user-management) to view it in the browser.

The page will reload if you make edits.  
You will also see any `lint` errors in the console.

## Types

```TypeScript
interface User {
  email: string
  id: number
  name: string
  phoneNumber: string
}

interface Message {
  type: 'success' | 'error'
  value: string
}
```
