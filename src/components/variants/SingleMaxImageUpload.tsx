
import { useRef, useState } from 'react'
import type { FileUploadConfig } from '../file-upload/ config-schema.ts'
import { UploadIcon, Cross2Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as Dialog from '@radix-ui/react-dialog'

type UploadedImage = {
    url: string
    name: string
    size: number
}

export const SingleMaxImageUpload = ({ config }: { config: FileUploadConfig }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [image, setImage] = useState<UploadedImage | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const handleFile = (fileList: FileList | null) => {
        setError(null)
        if (!fileList || fileList.length === 0) return

        const file = fileList[0]

        // Check file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file')
            return
        }

        // Check file size
        if (file.size > config.maxFileSizeMB * 1024 * 1024) {
            setError(`File size must be less than ${config.maxFileSizeMB}MB`)
            return
        }

        // Check file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        if (!fileExtension || !config.fileTypes.includes(fileExtension)) {
            setError(`Supported formats: ${config.fileTypes.join(', ')}`)
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            setImage({
                url: e.target?.result as string,
                name: file.name,
                size: file.size,
            })
        }
        reader.onerror = () => {
            setError('Error reading file')
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImage(null)
        setError(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    }

    const sizeClass = config.theme.size === 'lg' ? 'size-lg' :
        config.theme.size === 'sm' ? 'size-sm' :
            'size-md'
    const radiusClass = `radius-${config.theme.radius}`

    return (
        <div className="upload-container single-image-upload">
            {image ? (
                <div className={`single-image-preview ${radiusClass}`}>
                    <img
                        src={image.url}
                        alt="Uploaded preview"
                        className="preview-thumbnail"
                    />
                    <div className="dropzone-para">
                        <span className="dropzone-para">Name: {image.name} ∙ Size: {formatFileSize(image.size)}</span>
                    </div>
                    <div className="image-actions">
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="preview-button"
                            aria-label="Preview image"
                        >
                            <EyeOpenIcon />
                        </button>
                        <button
                            onClick={removeImage}
                            className="remove-button"
                            aria-label="Remove image"
                        >
                            <Cross2Icon />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className={`dropzone ${sizeClass} ${radiusClass} ${error ? 'error' : ''}`}
                    onClick={() => inputRef.current?.click()}
                >
                    <UploadIcon className="upload-icon" />
                    <p className="upload-text">{config.labels?.dropzoneText || 'Click to upload an image'}</p>
                    <p className="dropzone-para">
                        Supported: {config.fileTypes.join(', ')} · Max {config.maxFileSizeMB} MB
                    </p>
                    {error && <p className="error-message">{error}</p>}
                    <input
                        ref={inputRef}
                        type="file"
                        accept={config.fileTypes.map((ext) => `.${ext}`).join(',')}
                        onChange={(e) => handleFile(e.target.files)}
                        className="hidden-input"
                    />
                </div>
            )}

            <Dialog.Root open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                        {image && (
                            <>
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    className="preview-singleMaxImage"
                                />
                                <Dialog.Title className="dialog-title">
                                    {image.name}
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