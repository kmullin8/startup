# Trivia Challenge Leaderboard

A fun web app where users compete in short trivia challenges, earn points, and climb a global leaderboard.  
A brief description of the application here. 

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch
---
Tired of mindlessly scrolling? Put your knowledge to the test! **Trivia Challenge Leaderboard** is a fast-paced quiz game where you race against the clock to answer as many questions as possible. Each correct answer earns you points, and the more you get right, the higher you climb on the global leaderboard. With fresh trivia pulled from an external API and live leaderboard updates, you’ll always have new challenges waiting for you. Can you outscore your friends and claim the top spot?

### Design
---
#### Rough sketch of app layout

- **Login/Register Page**: Users can create accounts or log in.  
- **Game Page**: Timer counts down while trivia questions appear one by one. User selects answers and earns points.  
- **Leaderboard Page**: Shows the global leaderboard, updating live whenever a player posts a new score.

![Login Page](login%20page.png)
![question Page](question%20page.png)
![leaderboard Page](learder%20board.png)

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant TriviaAPI
    participant Database

    User->>Frontend: Logs in
    Frontend->>Backend: Authenticate user
    Backend->>Database: Verify credentials
    Database-->>Backend: Success
    Backend-->>Frontend: User authenticated

    User->>Frontend: Start trivia round
    Frontend->>Backend: Request questions
    Backend->>TriviaAPI: Fetch trivia questions
    TriviaAPI-->>Backend: Return trivia questions
    Backend-->>Frontend: Deliver questions with timer

    User->>Frontend: Answers questions
    Frontend->>Backend: Submit score
    Backend->>Database: Save score
    Backend-->>Frontend: Acknowledge

    User->>Frontend: View leaderboard
    Frontend->>Backend: Request leaderboard
    Backend->>Database: Retrieve top scores
    Database-->>Backend: Return leaderboard data
    Backend-->>Frontend: Display leaderboard

```

### Key features
---
- User Accounts: Register, log in, and save your progress.
- Trivia Gameplay: Timed rounds with points awarded for each correct answer.
- Dynamic Questions: Pulls trivia questions from a public trivia API.
- Global Leaderboard: Ranks players by score, stored in the database.
- Live Updates: Leaderboard updates instantly via WebSocket.
- Replayability: Always fresh trivia content with multiple categories and difficulties.

### Technologies
---
I am going to use the required technologies in the following ways.

-HTML – Structure the app with semantic elements like header, footer, navigation, forms (login), and main content areas (game + leaderboard).

-CSS – Style the app with a modern look: responsive layout, colors, animations for timer countdown, and hover effects on answer buttons.

-React – Build the app using React components. Use routing for navigation (Login, Game, Leaderboard pages). Use React hooks for timer countdowns, game state, and user interactivity.

-Service (Node.js/Express) – Provide backend endpoints for:
    -Register/login/logout
    -Start trivia round (fetch questions from API)
    -Submit score
    -Get leaderboard rankings

-DB/Login (MongoDB) – Store user accounts (securely hashed passwords) and game scores. Use queries to generate leaderboard rankings.

-WebSocket – Broadcast leaderboard updates to all connected clients when a new score is submitted. Keeps the experience interactive and exciting.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
