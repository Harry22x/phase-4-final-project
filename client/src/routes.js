import App from "./App"
import Home from "./Pages/Home"
import EventPage from "./Pages/EventPage"
import Login from "./Pages/Login"
import Account from "./Pages/Account"
import CreateEvent from "./Pages/CreateEvent"

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
            },
            {
                path:'/create_event',
                element:<CreateEvent/>
            },
        ]
    }]

export default routes