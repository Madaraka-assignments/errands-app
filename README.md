

## How to run the application locally


First, run the clone the repository:
```
git clone https://github.com/Madaraka-assignments/errands-app.git
```


Second, navigate to the directory:
```
cd errands-app
```

Third, install the dependencies:
```
pnpm install
```
or
```
yarn install
```
or
```
npm install
```


Fourth, set the environment variables:

#### Create .env file
Create a .env file in the root directory of the project and add the following content:

```
SESSION_SECRET=TDGASYRG33Q72YR7WEEWB
API_BASE_URL=api_base_url
NEXT_PUBLIC_APP_URL=localhost_app_url eg http://localhost:3000
```

Fifth, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Architectural design notes
    
    - The application is built using Next.js and React and typescript as per the requirements.
    - The styling is done using Tailwind CSS and shadcn UI components.

    #### Authentication
    - The session is stored in cookies and is encrypted using the provided secret key.
    - The user information is stored in cookies and is encrypted using the provided secret key.
    - Login and registration are handled using the provided API proxied through the application api folder to add a security layer on top of the API and avoid exposing sensitive access tokens on the network tab of the browser.

    #### Access Control
    - The application uses the Next.js middleware(proxy.ts) to handle access control and authentication.
    - The middleware checks if the user is authenticated before accessing the protected routes.
    - If the user is not authenticated, the middleware redirects the user to the login page.

    #### Data Fetching and creating tasks
    - The application uses the useQuery hook from the Tanstack Query library to fetch data from the API.
    - The useMutation hook from the Tanstack Query library is used to create tasks.
    - All post requests are made using the fetch API and Next.js's server actions. This ensures that the requests are handled by the server and makes it easier to access the cookies and session information which was previously stored in server cookies. The decision to use server side actions was mainly because the client side could not access the cookies and session information easily.

#### Assumptions
   - The main assumption made in the application is that in the completed api there will be an endpoint for fetching task types so I created a select dropdown for the task type.


## Vercel link
    

## Deploy on Vercel

[Vercel Platform](https://errands-app-jade.vercel.app)