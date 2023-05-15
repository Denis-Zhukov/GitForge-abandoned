import {Link, useParams} from "react-router-dom";
import {useGetRepositoryQuery} from "../../store/RTKQuery/repository.api";
import {FileTree} from "../../components/FileTree";
import {BufferInput} from "../../components/BufferInput";
import {Url} from "../../constans/Url";
import {Loader} from "../../components/Loader";
import {Path} from "../../constans/Path";
import s from "./style.module.scss";
import {useAppSelector} from "../../hooks";

export const Repository = () => {
    const {username, repository} = useParams();
    const myUsername = useAppSelector(state => state.auth.username);
    const {data, isLoading} = useGetRepositoryQuery({username, repository});

    if (isLoading) return <Loader/>

    const files: string[] | undefined = data?.files;

    return <div className={s.wrapper}>
        <div className={s.repositoryToolkit}>
            {username === myUsername ? <Link
                to={`/${username}/${repository}${Path.PROFILE_REPOSITORY_SETTINGS}`}
                className={s.settingsRepo}
            >Manage repository</Link> : <div/>}
            <BufferInput className={s.copy} text={`${Url.BASE_URL}/${username}/${repository}`}/>
        </div>
        {!data?.files ? <div className={s.empty}>It's empty. Make a commit.</div> : <FileTree dirs={files!}/>}
    </div>
}