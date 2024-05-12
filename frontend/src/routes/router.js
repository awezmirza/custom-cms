import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

// Pages Import
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";

import Root from "../layout/LayoutRoot";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="auth/:purpose" element={<Auth />} />
        </>
    )
);

export default router;
