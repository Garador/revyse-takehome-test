# Relevant notes of the rewrite

# Error triggering
To trigger the relevant error state from loading the currencies, use the following query parameter:

`throwError=true`

Example: http://localhost:5173/?throwError=true

# Setup instructions
This can be run as-is using the following command: `npm run dev`.
It can also be built by running: `npm run build` and then running `npm run start`.

# Notes on decisions or tradeoffs you made
- An effort has been made to use Tailwind CSS classes instead of other types of styling.
- Redux has been preserved to avoid prop drilling.
- Firebase has been used to simplify the auth. flow.
- An error boundary has been used to wrap the main error handling (handling errors via issues with the data loading) (`ErrorBoundary on _index.tsx`).
- Async. data loading capabilities have been used to reload data without reloading the page itself (`revalidator.revalidate`) out of the back-end.
- A guard component has been used to hide the "Watch" list as a simple guard functionality display.
- Most of the previous capabilities have been preserved.

# Relevant Credentials
* email: azolotdev+test1@gmail.com password: 123123
* email: azolotdev+test2@gmail.com password: 123123
* email: azolotdev+test3@gmail.com password: 123123

# Relevant Media

### Improvements on the UI
![image](https://github.com/user-attachments/assets/e33f489d-0a1d-408b-a1a7-6682a8455551)

![image](https://github.com/user-attachments/assets/d2e3247c-75cb-451c-8fcb-2210b61a7101)


### Error handling
![image](https://github.com/user-attachments/assets/9b8b68b9-cb06-456b-a436-8c6db5ee964e)

### Sorting interaction for the relevant 
[Screencast from 2025-05-22 11-10-15.webm](https://github.com/user-attachments/assets/f6e4acda-6e08-463f-b63c-d64066abe0cb)

### Infinite Scroll
![image](https://github.com/user-attachments/assets/cc8555e3-b714-4177-bba0-9d09a7d59e10)

