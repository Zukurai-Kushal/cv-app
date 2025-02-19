import Icon from "./Icon"
import appLogo from "../assets/typewriter.svg"

export default function Header() {
    return <header>
        <Icon src={appLogo} alt={"My Resume Logo"} />
        <h1>My Resume Writer.</h1>
    </header>
}