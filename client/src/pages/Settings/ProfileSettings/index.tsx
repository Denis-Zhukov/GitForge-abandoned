import ImageUploader from "../../../components/ImageUploader";
import {useDeleteProfileAvatarMutation, useUploadProfileAvatarMutation} from "../../../store/RTKQuery/profile.api";

export const ProfileSettings = () => {
    const [deleteAvatar, {}] = useDeleteProfileAvatarMutation();

    return <div>
        <ImageUploader action={useUploadProfileAvatarMutation}/>
        <button onClick={() => deleteAvatar({})}>Delete</button>
    </div>
}