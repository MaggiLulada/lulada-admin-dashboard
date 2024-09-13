# Admin Dashboard

This project is a frontend admin dashboard built using Next.js, designed to fetch and display data from Firestore. The dashboard allows administrators to view information about workouts, including details about the coach, participants, cost, and location, with links to Google Maps for the workout locations.

## Features

- **Workout Data Display**: Retrieves and displays workout data from Firestore, including the workout name, coach information, participants, cost, and location.
- **Google Maps Integration**: Provides a clickable link for the workout location, directing users to Google Maps for the address.
- **Dynamic Table Rendering**: Uses `@tanstack/react-table` to dynamically render the workout data in a table format.
- **Firestore Integration**: Fetches all workout documents from Firestore using the `getAllDocuments` service.
