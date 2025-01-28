import App from "./App"
import Home from "./Pages/Home"
import EventPage from "./Pages/EventPage"
import Login from "./Pages/Login"

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
            }
        ]
    }]

export default routes