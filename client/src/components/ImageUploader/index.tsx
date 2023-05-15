import React, {useState, ChangeEvent, DragEvent} from 'react';
import s from './style.module.scss';

interface Props {
    selectedFile: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
    className?: string
}

const ImageUploader: React.FC<Props> = ({selectedFile, setSelectedFile, className}) => {
    const [isDragging, setIsDragging] = useState(false);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0)
            setSelectedFile(e.target.files[0]);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0)
            setSelectedFile(e.dataTransfer.files[0]);
    };

    return (
        <div
            className={`${s.imageUploader} ${className} ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label htmlFor="upload-input" className={s.uploadLabel}>
                {selectedFile ? selectedFile.name : 'Select file...'}
            </label>
            <input
                id="upload-input"
                className={s.uploadInput}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUploader;
