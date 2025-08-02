
import type {FileUploadConfig} from "../file-upload/ config-schema";
import {UploadIcon, Cross2Icon} from "@radix-ui/react-icons";
import {useRef, useState} from "react";
import * as Dialog from '@radix-ui/react-dialog';

type UploadedFile = {
    name: string;
    size: number;
    id: string;
    preview?: string;
}

export const ButtonUpload = ({config} : {config: FileUploadConfig}) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [previewImage, setPreviewImage] = useState<UploadedFile | null>(null)

    const handleFiles = (files: FileList | null) => {
        if (!files) return
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const newFile = {
                    name: file.name,
                    size: file.size,
                    id: crypto.randomUUID(),
                    preview: e.target?.result as string
                }
                setUploadedFiles(prev => [...prev, newFile])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeFile = (id: string) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== id))
    }

    const previewFile = (id: string) => {
        const file = uploadedFiles.find(f => f.id === id)
        if (file) {
            setPreviewImage(file)
        }
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    }

    return(
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <button
                    className={`inline-flex items-center justify-center bg-white text-black px-4 py-2 rounded-${config.theme.radius} border`}
                    onClick={() => inputRef.current?.click()}
                >
                    {config.theme.iconPosition === 'left' && <UploadIcon className="mr-2" />}
                    {config.labels?.buttonText || 'Upload File'}
                    {config.theme.iconPosition === 'right' && <UploadIcon className="ml-2" />}
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    multiple
                    style={{display: 'none'}}
                    accept={config.fileTypes.map((ext) => `.${ext}`).join(',')}
                />
                <p className="dropzone-para">
                    Max size: {config.maxFileSizeMB}MB
                </p>
            </div>

            {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                    {uploadedFiles.map(file => (
                        <div key={file.id} className="file-item">
                            <div className="file-info">
                                <img src={file.preview} alt={file.name} className="w-12 h-12 object-cover rounded" />
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="file-name">{file.name}</span>
                                    <span className="file-size">{formatFileSize(file.size)}</span>
                                </span>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row'}} className="file-actions">
                                <button
                                    className="preview-Image"
                                    style={{width: 'fit-content', fontSize: '12px'}}
                                    onClick={() => previewFile(file.id)}
                                    aria-label="Preview"
                                >
                                    Preview
                                </button>
                                <button
                                    className="remove-file"
                                    onClick={() => removeFile(file.id)}
                                    aria-label="Remove"
                                >
                                    <Cross2Icon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Dialog.Root open={previewImage !== null} onOpenChange={() => setPreviewImage(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                        {previewImage && (
                            <>
                                <img
                                    src={previewImage.preview}
                                    alt={previewImage.name}
                                    className="preview-Image"
                                />
                                <Dialog.Title className="dialog-title">{previewImage.name}</Dialog.Title>
                                <Dialog.Close className="dialog-close">
                                    <Cross2Icon />
                                </Dialog.Close>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}