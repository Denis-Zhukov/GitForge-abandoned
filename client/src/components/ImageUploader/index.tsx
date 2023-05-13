import React, {useState, ChangeEvent, DragEvent} from 'react';
import './ImageUploader.scss';

const ImageUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Здесь можно выполнить загрузку изображения на сервер
            console.log(selectedFile);
        }
    };

    return (
        <div
            className={`image-uploader ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label htmlFor="upload-input" className="upload-label">
                {selectedFile ? selectedFile.name : 'Выберите файл'}
            </label>
            <input
                id="upload-input"
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
