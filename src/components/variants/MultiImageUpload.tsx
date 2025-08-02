import { useRef, useState, DragEvent } from 'react'
import type { FileUploadConfig } from '../file-upload/ config-schema'
import { UploadIcon, Cross2Icon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog'

type UploadedFile = {
    name: string
    size: number
    id: string
    preview?: string
}

export const MultiImageUpload = ({ config }: { config: FileUploadConfig }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [previewImage, setPreviewImage] = useState<UploadedFile | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFiles = (files: FileList | null) => {
        setError(null)
        if (!files) return

        const currentCount = uploadedFiles.length
        const selectedFiles = Array.from(files)

        if (currentCount >= 5) {
            setError('You can only upload up to 5 images')
            return
        }

        const filesToAdd = selectedFiles.slice(0, 5 - currentCount)

        filesToAdd.forEach((file) => {
            if (!file.type.startsWith('image/')) {
                setError('Please upload image files only')
                return
            }

            if (file.size > config.maxFileSizeMB * 1024 * 1024) {
                setError(`File size must be less than ${config.maxFileSizeMB}MB`)
                return
            }

            const fileExtension = file.name.split('.').pop()?.toLowerCase()
            if (!fileExtension || !config.fileTypes.includes(fileExtension)) {
                setError(`Supported formats: ${config.fileTypes.join(', ')}`)
                return
            }

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
            reader.onerror = () => {
                setError('Error reading file')
            }
            reader.readAsDataURL(file)
        })
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
        setError(null)
    }

    const previewFile = (id: string) => {
        const file = uploadedFiles.find((f) => f.id === id)
        if (file) {
            setPreviewImage(file)
        }
    }
    const sizeClass = config.theme.size === 'lg' ? 'size-lg' :
        config.theme.size === 'sm' ? 'size-sm' :
            'size-md'
    const radiusClass = `radius-${config.theme.radius}`

    return (
        <div className="upload-container">
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
                    <h4>{config.labels?.dropzoneText || 'Drop images here or click to upload'}</h4>
                    <p className="dropzone-para">
                        Supports: {config.fileTypes.join(', ')} · Max {config.maxFileSizeMB} MB per file · Max 5 files
                    </p>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept={config.fileTypes.map((ext) => `.${ext}`).join(',')}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden-input"
                />
            </div>

            {uploadedFiles.length > 0 && (
                <div className="uploaded-files-grid">
                    {uploadedFiles.map((file) => (
                        <div key={file.id} className="grid-item">
                            <img
                                src={file.preview}
                                alt={file.name}
                                className="grid-image"
                                onClick={() => previewFile(file.id)}
                            />
                            <button
                                className="remove-file"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(file.id);
                                }}
                                aria-label="Remove"
                            >
                                <Cross2Icon />
                            </button>
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
                                <Dialog.Title className="dialog-title">
                                    {previewImage.name}
                                </Dialog.Title>
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