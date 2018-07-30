import React from "react";
import { Link } from "@reach/router";

const Layout = props => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/today">Today</Link>
                </li>
                <li>
                    <Link to="/history">History</Link>
                </li>
            </ul>
            {props.children}
        </div>
    );
};

export default Layout;
