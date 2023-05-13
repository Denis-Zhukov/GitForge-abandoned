import {Navigate, Route, Routes} from "react-router-dom";
import {Path} from "../../constans/Path";
import {ProfileSettings} from "./ProfileSettings";

export const Settings = () => {

    return <Routes>
        <Route path={Path.SETTINGS_PROFILE} element={<ProfileSettings/>}/>
        <Route path={Path.ANY} element={<Navigate to={`${Path.SETTINGS}${Path.SETTINGS_PROFILE}`}/>}/>
    </Routes>
}