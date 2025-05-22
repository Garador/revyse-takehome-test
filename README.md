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