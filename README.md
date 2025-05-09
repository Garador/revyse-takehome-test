# Custom set-up installation
No custom set-up required.

# Relevant Developer Notes
* Extra carelessness has been taken in consideration: currently, public Firebase credentials are stored to run the project as-is. This should be parametrized and should not be commited. Only has been done for demo purposes. Also, the API key to fetch the relevant real-time Crypto data SHOULD NOT BE COMMITED. This was only done for demo purposes.
* Context API vs Redux API: The redux API has been implemented; however, due the size of the project, it is not a good idea. This was done merely for practice and demo purposes.
* Testing: A lack of testing is present. Efforts were made to add them; however, in the interest of time, they were not ultimately added.
* Single route and SPA: No additional routes for authentication were added to simplify the flow and the demo of the core functionality, focusing on FE. However, it is worth noting that, on cases where SEO and further server-based optimizations are required, additional routes could be added.
* Data loading stub: A stub has been added as a data result and a timeout for 5 seconds implemented to simulate delays; this was made to simulate the data loading without exhausting the free credit calls given for the used API. This can be uncommented on the `./app/utils/crypto.ts` file.

## Relevant Credentials

email: azolotdev+test1@gmail.com
password: 123123

email: azolotdev+test2@gmail.com
password: 123123

email: azolotdev+test3@gmail.com
password: 123123


# Implemented features
## Sign-In
![Screenshot from 2025-05-09 00-27-14](https://github.com/user-attachments/assets/b9e7aa54-511a-4126-ad7f-ff3a48ed904f)

## Sign-Up
![Screenshot from 2025-05-09 00-27-11](https://github.com/user-attachments/assets/de989f0d-c71c-4a67-8aea-3db82f896a5e)

## Auth Guard
![Screenshot from 2025-05-09 00-26-36](https://github.com/user-attachments/assets/fb41301b-180d-423c-b362-25fe50617a8d)

## Search Bar
![Screenshot from 2025-05-09 00-23-47](https://github.com/user-attachments/assets/29323d32-7570-4671-b3f4-02a487180457)

## Loading State
![Screenshot from 2025-05-09 00-23-36](https://github.com/user-attachments/assets/ebef9e4d-8533-4ff5-a56e-47d76f7eee27)

## Error State
![Screenshot from 2025-05-09 00-23-20](https://github.com/user-attachments/assets/9ede64f1-da32-45fd-90e1-bab8bc0c9c74)

## Light mode toggle
![image](https://github.com/user-attachments/assets/366e2272-bc8d-4c82-8666-8fa1ee9944ed)

## Data refresh
![image](https://github.com/user-attachments/assets/6e53b172-129d-4369-9145-b81c864c5b8f)

## Theme and sorting order storage on local storage
![image](https://github.com/user-attachments/assets/fdb335fe-290d-4c0d-b7d6-6a3719884d59)






# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

