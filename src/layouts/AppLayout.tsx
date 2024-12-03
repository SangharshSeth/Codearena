import {Outlet} from "react-router-dom";

export const Applayout = () => {
    return <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow">
            <Outlet />
        </main>
    </div>
}