import React, {useState, ChangeEvent, DragEvent} from 'react';
import {UseMutation} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import s from './style.module.scss';

interface Props {
    action: UseMutation<any>
}

const ImageUploader: React.FC<Props> = ({action}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [sendImage, {isLoading, isSuccess, error, data}] = action();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0)
            setSelectedFile(e.dataTransfer.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) sendImage(selectedFile);
    };

    return (
        <div
            className={`${s.imageUploader} ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label htmlFor="upload-input" className={s.uploadLabel}>
                {selectedFile ? selectedFile.name : 'Выберите файл'}
            </label>
            <input
                id={s.uploadInput}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button className="upload-button" onClick={handleUpload}>
                Загрузить
            </button>
        </div>
    );
};

export default ImageUploader;
