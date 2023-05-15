import React, {useMemo, useState} from "react";
import s from "./style.module.scss";

interface Props {
    dirs: string[]
}

export const FileTree: React.FC<Props> = ({dirs}) => {
    const [currentPath, setCurrentPath] = useState("");

    let currentDirs = useMemo(() => dirs
        .filter(dir => dir.startsWith(currentPath))
        .map(dir => {
            dir = dir.replace(new RegExp(`^${currentPath}`), '');
            const pathParts = dir.split('/');
            if (pathParts.length > 1)
                return {name: pathParts[0], type: "folder"}
            return {name: dir, type: "file"}
        }), [currentPath, dirs]);

    // @ts-ignore
    currentDirs = Array.from(new Set(currentDirs.map(JSON.stringify)), JSON.parse);

    const handleLeaveUp = () => setCurrentPath(currentPath.split("/").slice(0, -2).join("/"));
    const handleEnterFolder = (dir: any) => setCurrentPath(currentPath + `${dir.name}/`)

    return <div className={s.wrapper}>
        {currentPath && <button onClick={handleLeaveUp} className={s.folder}>..</button>}
        {currentDirs.map((dir) => (
            <button
                key={dir.name}
                className={`${dir.type === "folder" ? s.folder : s.file}`}
                onClick={dir.type === "folder" ? () => handleEnterFolder(dir) : undefined}
            >{dir.name}</button>
        ))}
    </div>
}