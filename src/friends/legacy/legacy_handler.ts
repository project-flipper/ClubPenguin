import './jquery.ui.css';
import './disney-friends.css';
import './club.css';
import './lib/jquery.ui.min';
import './lib/libs.min';
import { init } from './disney-friends-with-ui';

export default function getHandler(paths: Parameters<typeof init>[0]): typeof window.Disney {
    init(paths);
    return window.Disney;
}
