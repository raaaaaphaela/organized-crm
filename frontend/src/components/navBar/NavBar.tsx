import LogoutButton from "../LogoutButton";
import "./_nav-bar.scss";

export default function NavBar() {
    return (
        <div className={"nav__container"}>
            <div className={"nav__logo"}>
                <h1>LOGO</h1>
            </div>
            <div className={"nav_menu"}>
                <ul>
                    <li>Startseite</li>
                    <li><LogoutButton/></li>
                </ul>
            </div>
        </div>
    )
}