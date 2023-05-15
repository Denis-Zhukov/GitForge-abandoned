import {useDeleteRepositoryMutation} from "../../../store/RTKQuery/repository.api";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../../components/Button";
import {useCallback, useState} from "react";
import {Path} from "../../../constans/Path";
import {Input} from "../../../components/Input";
import {useCreateOnChangeHandler} from "../../../hooks";
import {Modal} from "../../../components/Modal";
import s from "../../Settings/ProfileSettings/style.module.scss";

export const RepositorySettings = () => {
    const navigate = useNavigate();
    const [deleteRepo, {}] = useDeleteRepositoryMutation();
    const {username, repository} = useParams();
    const [description, setDescription] = useState<string>("");
    const handleDescriptionChange = useCreateOnChangeHandler(setDescription);

    const [modelOpened, setModelOpened] = useState<boolean>(false);

    const handleDeleteRepositoryClick = useCallback(() => {
        deleteRepo(repository!);
        navigate(`/${username}${Path.PROFILE_REPOSITORIES}`)
    }, [repository, deleteRepo, navigate, username]);

    const handleSetDescription = () => {

    }

    return <div>
        <div className={s.container}>
            <label>
                <span>Description: </span>
                <Input type="text" value={description} onChange={handleDescriptionChange} className={s.input}/>
            </label>
            <Button onClick={handleSetDescription}>Set</Button>

            {/*<div className={`${s.status} ${isErrorSetProfession ? s.error : s.success}`}>*/}
            {/*    {lastStatusProfession}*/}
            {/*</div>*/}
        </div>
        <Button onClick={() => setModelOpened(true)}>Delete Repository</Button>
        <Modal open={modelOpened} onClose={() => setModelOpened(false)}>
            <div className={s.confirmForm}>
                <div>Are you sure?</div>
                <div className={s.buttons}>
                    <Button onClick={handleDeleteRepositoryClick}>Yes</Button>
                    <Button onClick={() => setModelOpened(false)}>No</Button>
                </div>
            </div>
        </Modal>
    </div>
}