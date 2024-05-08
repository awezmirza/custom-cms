import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router-dom";

import router from "./routes/router.js";

// RDX TKT
import { store } from "./config/store";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </Provider>
    // </React.StrictMode>
);
