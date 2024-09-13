import "./jquery.ui.css";
import "./disney-friends.css";
import "./club.css";
import "./lib/jquery.ui.min";
import "./lib/libs.min";
import init from "./disney-friends-with-ui";

export default function getHandler(...params: Parameters<typeof init>): typeof window.Disney {
    init(...params);
    return window.Disney;
}
