import type { ReactElement } from "react";

import Home from "../views/Home";
import Modeles from "../views/modeles/Modeles";
import ModeleEditor from "../views/modeles/ModeleEditor";
import Optimize from "../views/Optimize";

export interface AppRoute {
    path: string;
    element: ReactElement;
}

const routes: AppRoute[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "modeles",
        element: <Modeles />,
    },
    {
        path: "modeles/:modelId",
        element: <ModeleEditor />,
    },
    {
        path: "optimize",
        element: <Optimize />,
    },
];

export default routes;
