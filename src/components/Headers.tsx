import { useLocation } from "react-router"

const baseStyle = "flex-1 text-center text-white hover:bg-slate-700 px-2 py-1 rounded";
const selectedStyle = "flex-1 text-center text-white bg-slate-700 px-2 py-1 rounded";

export function Headers() {
    const { pathname } = useLocation();

    return <nav className="flex flex-row w-full p-2 bg-slate-600">
        <a href="/" className={pathname == "/" ? selectedStyle : baseStyle}>
            Home
        </a>
        <a href="/Classement" className={pathname == "/Classement" ? selectedStyle : baseStyle}>
            Classements
        </a>
        <a href="/Hopitaux" className={pathname == "/Hopitaux" ? selectedStyle : baseStyle}>
            Hopitaux
        </a>
        <a href="/Place" className={pathname == "/Place" ? selectedStyle : baseStyle}>
            Places
        </a>
        <a href="/Preference" className={pathname == "/Preference" ? selectedStyle : baseStyle}>
            Preferences
        </a>
        <a href="/Resultat" className={pathname == "/Resultat" ? selectedStyle : baseStyle}>
            Resultats
        </a>
        <a href="/Service" className={pathname == "/Service" ? selectedStyle : baseStyle}>
            Services
        </a>
    </nav>
}