import ImageUploader from "../../../components/ImageUploader";
import {
    useDeleteProfileAvatarMutation,
    useGetProfileQuery, useSetProfileProfessionMutation, useSetProfileSummaryMutation,
    useUploadProfileAvatarMutation
} from "../../../store/RTKQuery/profile.api";
import {useState} from "react";
import {Button} from "../../../components/Button";
import {useAppSelector, useCreateOnChangeHandler} from "../../../hooks";
import {Input} from "../../../components/Input";
import s from "./style.module.scss"

export const ProfileSettings = () => {
    const username = useAppSelector(state => state.auth.username);
    const {data} = useGetProfileQuery(username!);

    const [uploadAvatar, {
        isError: isErrorUploadAvatar
    }] = useUploadProfileAvatarMutation();
    const [deleteAvatar, {
        isError: isErrorDeleteAvatar,
    }] = useDeleteProfileAvatarMutation();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [lastStatusAvatar, setLastStatusAvatar] = useState("");
    const handleUploadAvatarClick = () => {
        if (avatar) uploadAvatar(avatar)
            .then(() => setLastStatusAvatar("Uploaded"))
            .catch(() => setLastStatusAvatar("Error"))
    };
    const handleDeleteAvatarClick = () => deleteAvatar({})
        .then(() => setLastStatusAvatar("Deleted"))
        .catch(() => setLastStatusAvatar("Error"));


    const [profession, setProfession] = useState<string>(data?.profession || "");
    const handleProfessionChange = useCreateOnChangeHandler(setProfession);

    const [lastStatusProfession, setLastStatusProfession] = useState("");
    const [setProfileProfession, {isError: isErrorSetProfession}] = useSetProfileProfessionMutation();
    const handleSetProfession = () => {
        setProfileProfession(profession)
            .then(() => setLastStatusProfession("Set"))
            .catch(() => setLastStatusAvatar("Error"));
    }


    const [summary, setSummary] = useState<string>(data?.summary || "");
    const handleSummaryChange = useCreateOnChangeHandler(setSummary);

    const [lastStatusSummary, setLastStatusSummary] = useState("");
    const [setProfileSummary, {isError: isErrorSetSummary}] = useSetProfileSummaryMutation();
    const handleSetSummary = () => {
        setProfileSummary(summary)
            .then(() => setLastStatusSummary("Set"))
            .catch(() => setLastStatusSummary("Error"));
    }

    return <div className={s.wrapper}>

        <div className={s.container}>
            <img className={s.avatar} src={data?.avatar || "/images/defaultAvatar.png"} alt="Avatar"/>
            <ImageUploader className={s.loader} selectedFile={avatar} setSelectedFile={setAvatar}/>
            <Button onClick={handleUploadAvatarClick}>Upload</Button>
            <Button onClick={handleDeleteAvatarClick}>Delete</Button>

            <div className={`${s.status} ${(isErrorUploadAvatar || isErrorDeleteAvatar) ? s.error : s.success}`}>
                {lastStatusAvatar}
            </div>
        </div>


        <div className={s.container}>
            <label>
                <span>Profession: </span>
                <Input type="text" value={profession} onChange={handleProfessionChange} className={s.input}/>
            </label>
            <Button onClick={handleSetProfession}>Set</Button>

            <div className={`${s.status} ${isErrorSetProfession ? s.error : s.success}`}>
                {lastStatusProfession}
            </div>
        </div>


        <div className={s.container}>
            <label>
                <span>Summary: </span>
                <Input type="text" value={summary} onChange={handleSummaryChange} className={s.input}/>
            </label>
            <Button onClick={handleSetSummary}>Set</Button>

            <div className={`${s.status} ${isErrorSetSummary ? s.error : s.success}`}>
                {lastStatusSummary}
            </div>
        </div>

    </div>
}