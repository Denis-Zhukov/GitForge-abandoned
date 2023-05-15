import {Link, useParams} from "react-router-dom";
import {useGetRepositoriesQuery} from "../../store/RTKQuery/repository.api";
import {MRepositoryCard} from "../../components/RepositoryCard";
import {Path} from "../../constans/Path";
import {useAppSelector} from "../../hooks";
import {Loader} from "../../components/Loader";
import {motion} from "framer-motion";
import s from "./style.module.scss";
import {appear} from "../../utils/animations";

export const Repositories = () => {
    const {username} = useParams();
    const myUsername = useAppSelector(state => state.auth.username);
    const {data, isError, isLoading} = useGetRepositoriesQuery(username!);


    if (isLoading) return <Loader/>;
    if (isError) return <div className={s.empty}>An error has occurred</div>

    let content;
    if (data && data.length > 0)
        content = data?.map(repo => (
                <Link
                    key={repo.id}
                    to={`/${username}/${repo.name}`}>
                    <MRepositoryCard name={repo.name} languages={repo.languages} initial="hidden" whileInView="visible"
                                     variants={appear}/>
                </Link>
            )
        );
    else if (data) content = <div className={s.empty}>
        {username === myUsername ? <><span>You</span> don't have any repositories yet</> :
            <><span>{username}</span> doesn't have any repositories yet</>}
    </div>;

    return <div className={s.wrapper}>
        {username === myUsername &&
            <motion.div initial="hidden" whileInView="visible" variants={appear} viewport={{once: true}}>
                <Link to={`/${username}${Path.PROFILE_CREATE_REPOSITORY}`} className={s.addRepo}>Add</Link>
            </motion.div>
        }
        <div className={s.repositories}>
            {content}
        </div>
    </div>
}