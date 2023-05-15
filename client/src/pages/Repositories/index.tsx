import {useCallback} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Path} from "../../constans/Path";
import {useGetRepositoriesQuery} from "../../store/RTKQuery/repository.api";
import RepositoryCard from "../../components/RepositoryCard";
import s from "./style.module.scss";

export const Repositories = () => {
    const navigate = useNavigate();

    const {username} = useParams();
    const {data} = useGetRepositoriesQuery(username!);

    const handleCreateRepo = useCallback(() => {
        navigate(`${Path.PROFILE}${Path.PROFILE_CREATE_REPOSITORY}`)
    }, [navigate]);

    return <>
        <button onClick={handleCreateRepo}>Add</button>
        <div className={s.repositories}>
            {data?.map(repo => (
                    <Link
                        key={repo.id}
                        to={`/${username}/${repo.name}`}>
                        <RepositoryCard name={repo.name} languages={repo.languages}/>
                    </Link>
                )
            )}
        </div>
    </>
}