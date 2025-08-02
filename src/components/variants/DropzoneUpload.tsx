import { useRef, useState, DragEvent } from 'react'
import type { FileUploadConfig } from '../file-upload/ config-schema'
import { UploadIcon, Cross2Icon, LockClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import sampleImg1 from '../../assets/img1.jpg'
import * as Dialog from '@radix-ui/react-dialog'

type UploadedFile = {
    name: string
    size: number
    id: string
    preview?: string
}

const defaultFiles: UploadedFile[] = [
    {
        name: 'sample-image-1.jpg',
        size: 1024 * 1024 * 2,
        id: crypto.randomUUID(),
        preview: sampleImg1,
    },
    {
        name: 'sample-image-2.png',
        size: 1024 * 1024 * 1.5,
        id: crypto.randomUUID(),
        preview: 'https://picsum.photos/50/50?random=2',
    },
    {
        name: 'sample-image-3.jpg',
        size: 1024 * 1024 * 1.8,
        id: crypto.randomUUID(),
        preview: 'https://picsum.photos/50/50?random=3',
    },
]

export const DropzoneUpload = ({ config }: { config: FileUploadConfig }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(defaultFiles)
    const [isDragging, setIsDragging] = useState(false)
    const [previewImage, setPreviewImage] = useState<UploadedFile | null>(null)

    const handleFiles = (files: FileList | null) => {
        if (!files) return

        Array.from(files).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    const newFile = {
                        name: file.name,
                        size: file.size,
                        id: crypto.randomUUID(),
                        preview: e.target?.result as string,
                    }
                    setUploadedFiles((prev) => [...prev, newFile])
                }
                reader.readAsDataURL(file)
            }
        })
    }

    const previewFile = (id: string) => {
        const file = uploadedFiles.find((f) => f.id === id)
        if (file) {
            setPreviewImage(file)
        }
    }

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    }

    const sizeClass =
        config.theme.size === 'lg' ? 'size-lg' : config.theme.size === 'sm' ? 'size-sm' : 'size-md'
    const radiusClass = `radius-${config.theme.radius}`

    return (
        <>
            <div className="upload-container">
                {uploadedFiles.length >= 5 ? (
                    <div className="dropzone lock">
                        <div className="dropzone-content">
                            <LockClosedIcon className="upload-icon" />
                            <h4>Maximum files has been uploaded, which is 5.</h4>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            className="hidden-input"
                            onChange={(e) => handleFiles(e.target.files)}
                            accept={config.fileTypes.join(',')}
                        />
                    </div>
                ) : (
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`dropzone ${sizeClass} ${radiusClass} ${isDragging ? 'dragging' : ''}`}
                    >
                        <div className="dropzone-content">
                            <UploadIcon className="upload-icon" />
                            <h4>{config.labels?.dropzoneText || 'Drag & drop or click to upload'}</h4>
                            <p className="dropzone-para">
                                Supports: {config.fileTypes.join(', ')} ∙ Up To {config.maxFileSizeMB} MB
                            </p>
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            className="hidden-input"
                            onChange={(e) => handleFiles(e.target.files)}
                            accept={config.fileTypes.join(',')}
                        />
                    </div>
                )}

                {uploadedFiles.length > 0 && (
                    <div className="uploaded-files">
                        {uploadedFiles.map((file) => (
                            <div key={file.id} className="file-item">
                                <div className="file-info">
                                    <img src={file.preview} alt="uploaded-img" />
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{formatFileSize(file.size)}</span>
                  </span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row'}} className="file-actions">
                                <button className="preview-Image" style={{width: 'fit-content', fontSize: '12px'}} onClick={() => previewFile(file.id)} aria-label="Preview">
                                    Preview
                                </button>
                                <button className="remove-file" onClick={() => removeFile(file.id)} aria-label="Remove">
                                    <Cross2Icon />
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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
        </>
    )
}
