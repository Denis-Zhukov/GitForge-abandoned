import {Input} from "../../components/Input";
import s from "./style.module.scss";
import {useCreateRepositoryMutation} from "../../store/RTKQuery/repository.api";
import {useState} from "react";
import {useCreateOnChangeHandler} from "../../hooks";

export const CreateRepository = () => {
    const [createRepo, {}] = useCreateRepositoryMutation();


    const [repoName, setRepoName] = useState("");
    const handleRepoNameChange = useCreateOnChangeHandler(setRepoName);

    const handleCreateClick = () => {
        createRepo(repoName);
    }

    return <div className={s.wrapper}>
        <label>Repository name: <Input type="text" value={repoName} onChange={handleRepoNameChange}/></label>
        <button onClick={handleCreateClick}>Create</button>
    </div>
}