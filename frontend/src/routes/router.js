import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

// Pages Import
import Home from "../pages/Home";
import About from "../pages/About";
import Reels from "../pages/Reels";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
import GamePage from "../pages/GamePage";

import Root from "../layout/LayoutRoot";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="reels" element={<Reels />} />
                <Route path="about" element={<About />} />
                <Route path="explore" element={<Explore />} />
                <Route path="profile" element={<Profile />} />
                <Route path="auth/:purpose" element={<Auth />} />
                <Route path="game/:gameslug" element={<GamePage />} />
            </Route>
        </>
    )
);

export default router;
