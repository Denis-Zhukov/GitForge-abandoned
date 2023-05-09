import {Link} from "react-router-dom";
import {Path} from "../../constans/Path";
import s from "./style.module.scss";

export const Footer = () => {
    return <div className={s.footer}>
        <Link to={Path.MAIN} className={s.brand}>Git<span className={s.mainColor}>Forge</span></Link>
        <div className={s.text}>&copy;  Denis Zhukov</div>
    </div>
}