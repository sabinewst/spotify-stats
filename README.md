# Spotify stats

Spotify Stats is a Svelte web application that uses Spotify's Web API. It allows users to get an overview of their most played tracks and artists on Spotify, as well as receive a list of recommended tracks based on their listening habits.

This application was created using [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Prerequisites

Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org).

## Getting started

To get a local copy of this project up and running, follow these steps:

1. Clone the repository:

```
git clone https://github.com/sabinewst/spotify-stats.git
```

2. Change to the project directory:

```
cd spotify-stats

```

3. Install the project dependencies:

```
npm install

```

4. Create a Spotify Developer Application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

5. Configure your environment variables by creating a `.env` file in the project root directory. Add your Spotify client ID and the redirect URI (most likely `http://localhost:5173`).

```

CLIENT_ID=""
REDIRECT_URI=""

```

6. Start the development server:

```

npm run dev

```

7. Open your web browser and visit `http://localhost:5173` to see the app in action.
