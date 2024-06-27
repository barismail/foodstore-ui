import {config} from '../../config.js';
import {Link} from "react-router-dom";

export default function StoreLogo() {
    return <Link to='/'>
        <div className="text-red-600 font-bold text-4xl">
            {config.site_title}
        </div>
    </Link>
}