import {useParams} from "react-router-dom";
import {useGetRepositoryQuery} from "../../store/RTKQuery/repository.api";
import {FileTree} from "../../components/FileTree";
import {BufferInput} from "../../components/BufferInput";
import {Url} from "../../constans/Url";
import s from "./style.module.scss";

export const Repository = () => {
    const {username, repository} = useParams();
    const {data, isLoading} = useGetRepositoryQuery({username, repository});

    if (isLoading) return <p>Загрузка...</p>

    const files: string[] | undefined = data?.files;

    return <div className={s.wrapper}>
        <BufferInput className={s.copy} text={`${Url.BASE_URL}/${username}/${repository}`}/>
        {!data?.files ? <p>Пусто</p> : <FileTree dirs={files!}/>}
    </div>
}