import React, {useMemo, useState} from "react";
import s from "./style.module.scss";

interface Props {
    dirs: string[]
}

export const FileTree: React.FC<Props> = ({dirs}) => {
    const [currentPath, setCurrentPath] = useState("");

    const currentDirs = useMemo(() => dirs
        .filter(dir => dir.startsWith(currentPath))
        .map(dir => {
            dir = dir.replace(new RegExp(`^${currentPath}`), '');
            const pathParts = dir.split('/');

            if (pathParts.length > 1) return {type: "folder", name: pathParts[0]}
            else return {type: "file", name: pathParts[0]};
        }).filter((obj, index, self) =>
            index === self.findIndex((o) => o.name === obj.name && o.type === obj.type)
        ), [currentPath, dirs]);

    console.log("PATH:", currentPath);


    const handleLeaveUp = () => {
        let path = currentPath.split("/").slice(0, -2).join("/");
        if (path) path += "/";
        setCurrentPath(path);
    }
    const handleEnterFolder = (dir: any) => setCurrentPath(currentPath + `${dir.name}/`)

    return <div className={s.wrapper}>
        {currentPath && <button onClick={handleLeaveUp} className={s.folder}>..</button>}
        {currentDirs.map((dir) => (
            <div
                key={dir.name}
                className={`${dir.type === "folder" ? s.folder : s.file}`}
                onClick={dir.type === "folder" ? () => handleEnterFolder(dir) : undefined}
            >
                {dir.type === "folder" ?
                    <img src="/images/folder.png" alt="folder"/> :
                    <img src="/images/file.png" alt="file"/>}
                {dir.name}
            </div>
        ))}
    </div>
}