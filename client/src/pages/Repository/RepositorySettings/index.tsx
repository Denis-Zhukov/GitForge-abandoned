import {
    useDeleteRepositoryMutation,
    useGetRepositoryQuery,
    useSetDescriptionRepositoryMutation, useToggleFavoriteMutation
} from "../../../store/RTKQuery/repository.api";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../../components/Button";
import {useCallback, useEffect, useState} from "react";
import {Path} from "../../../constans/Path";
import {Input} from "../../../components/Input";
import {useCreateOnChangeHandler} from "../../../hooks";
import {Modal} from "../../../components/Modal";
import s from "./style.module.scss"

export const RepositorySettings = () => {
    const navigate = useNavigate();
    const [deleteRepo] = useDeleteRepositoryMutation();
    const {username, repository} = useParams();
    const [description, setDescription] = useState<string>("");
    const handleDescriptionChange = useCreateOnChangeHandler(setDescription);

    const [modelOpened, setModelOpened] = useState<boolean>(false);

    const handleDeleteRepositoryClick = useCallback(() => {
        deleteRepo(repository!);
        navigate(`/${username}${Path.PROFILE_REPOSITORIES}`)
    }, [repository, deleteRepo, navigate, username]);

    const [setDescriptionRepository, {
        isError: isErrorSetDescription,
        isSuccess: isSuccessSetDescription
    }] = useSetDescriptionRepositoryMutation();

    const handleSetDescription = () => setDescriptionRepository({repo: repository!, description});

    const {data, isSuccess} = useGetRepositoryQuery({username, repository})
    const [favorite, setFavorite] = useState<boolean>(false);
    useEffect(() => {
        console.log(data)
        if (isSuccess) setFavorite(data.favorite)
    }, [isSuccess, data]);


    const [toggleFavorite] = useToggleFavoriteMutation();
    const handleToggleFavorite = () => {
        toggleFavorite(repository!);
        setFavorite(!favorite);
    }

    return <div>
        <div className={s.container}>
            <label>
                <span>Description: </span>
                <Input type="text" value={description} onChange={handleDescriptionChange} className={s.input}/>
            </label>
            <Button onClick={handleSetDescription}>Set</Button>

            <div className={`${s.status} ${isErrorSetDescription ? s.error : s.success}`}>
                {isErrorSetDescription ? "Error" : isSuccessSetDescription ? "Set" : ""}
            </div>
        </div>

        <div className={s.container}>
            <label>
                <span>Favorite: </span>
                <Input type="checkbox" onChange={handleToggleFavorite} className={s.input} checked={favorite}/>
            </label>
        </div>

        <Button onClick={() => setModelOpened(true)}>Delete Repository</Button>

        <Modal open={modelOpened} onClose={() => setModelOpened(false)}>
            <div className={s.confirm}>
                <div>Are you sure?</div>
                <div className={s.btns}>
                    <Button onClick={handleDeleteRepositoryClick}>Yes</Button>
                    <Button onClick={() => setModelOpened(false)}>No</Button>
                </div>
            </div>
        </Modal>
    </div>
}