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
import CreateTable from "../pages/CreateTable";
import Table from "../pages/Table";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/create-table" element={<CreateTable />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/table/:tableId" element={<Table />} />
            </Route>
            <Route path="auth/:purpose" element={<Auth />} />
        </>
    )
);

export default router;
