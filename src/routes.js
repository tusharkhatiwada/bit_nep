import React from "react";
import { Router } from "@reach/router";

import Today from "./components/today";
import History from "./components/history";
import Layout from "./layout";

const Routes = () => {
    return (
        <Router>
            <Layout path="/">
                <Today path="today" />
                <History path="history" />
            </Layout>
        </Router>
    );
};

export default Routes;
