import App from "./App"
import Home from "./Pages/Home"
import EventPage from "./Pages/EventPage"
import Login from "./Pages/Login"
import Account from "./Pages/Account"

const routes = [
    {
        path: "/",
        element: <App />,
                children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/events/:id",
                element: <EventPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path:'/account',
                element:<Account/>
            }
        ]
    }]

export default routes