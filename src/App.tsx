import { useState } from 'react'
import type { FileUploadConfig } from './components/file-upload/ config-schema'
// Rest of the file remains the same
import { FileUpload } from './components/file-upload'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil2Icon } from '@radix-ui/react-icons'

const defaultDropzoneConfig: FileUploadConfig = {
    variant: 'dropzone',
    maxFileSizeMB: 5,
    maxFileLimit: 5,
    fileTypes: ['jpg', 'png'],
    theme: {
        size: 'md',
        radius: 'md',
        iconPosition: 'left',
    },
    labels: {
        dropzoneText: 'Drop files here or click to upload',
    },
}

const defaultButtonConfig: FileUploadConfig = {
    variant: 'button',
    maxFileSizeMB: 5,
    maxFileLimit: 5,
    fileTypes: ['jpg', 'png', 'pdf'],
    theme: {
        size: 'md',
        radius: 'md',
        iconPosition: 'left',
    },
    labels: {
        buttonText: 'Upload Files',
    },
}

const defaultSingleImageConfig: FileUploadConfig = {
    variant: 'single-image',
    maxFileSizeMB: 3,
    maxFileLimit: 1,
    fileTypes: ['jpg', 'jpeg', 'png'],
    theme: {
        size: 'md',
        radius: 'md',
        iconPosition: 'left',
    },
    labels: {
        dropzoneText: 'Upload a single image',
    },
}

const defaultMultiImageConfig: FileUploadConfig = {
    variant: 'multi-image',
    maxFileSizeMB: 5,
    maxFileLimit: 5,
    fileTypes: ['jpg', 'jpeg', 'png', 'gif'],
    theme: {
        size: 'md',
        radius: 'md',
        iconPosition: 'left',
    },
    labels: {
        dropzoneText: 'Drop images here or click to upload',
    },
}

const defaultMixedCardConfig: FileUploadConfig = {
    variant: 'mixed-card',
    maxFileSizeMB: 10,
    maxFileLimit: 5,
    fileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
    theme: {
        size: 'md',
        radius: 'md',
        iconPosition: 'left',
    },
    labels: {
        mixedCardText: 'Upload files or images',
    },
}


export default function Demo() {
    const [dropzoneConfigText, setDropzoneConfigText] = useState(JSON.stringify(defaultDropzoneConfig, null, 2))
    const [dropzoneConfig, setDropzoneConfig] = useState<FileUploadConfig>(defaultDropzoneConfig)
    const [dropzoneOpen, setDropzoneOpen] = useState(false)

    const [buttonConfigText, setButtonConfigText] = useState(JSON.stringify(defaultButtonConfig, null, 2))
    const [buttonConfig, setButtonConfig] = useState<FileUploadConfig>(defaultButtonConfig)
    const [buttonOpen, setButtonOpen] = useState(false)

    const [singleImageConfigText, setSingleImageConfigText] = useState(JSON.stringify(defaultSingleImageConfig, null, 2))
    const [singleImageConfig, setSingleImageConfig] = useState<FileUploadConfig>(defaultSingleImageConfig)
    const [singleImageOpen, setSingleImageOpen] = useState(false)

    const [multiImageConfigText, setMultiImageConfigText] = useState(JSON.stringify(defaultMultiImageConfig, null, 2))
    const [multiImageConfig, setMultiImageConfig] = useState<FileUploadConfig>(defaultMultiImageConfig)
    const [multiImageOpen, setMultiImageOpen] = useState(false)

    const [mixedCardConfigText, setMixedCardConfigText] = useState(
        JSON.stringify(defaultMixedCardConfig, null, 2)
    )
    const [mixedCardConfig, setMixedCardConfig] = useState<FileUploadConfig>(defaultMixedCardConfig)
    const [mixedCardOpen, setMixedCardOpen] = useState(false)


    const handleDropzoneChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDropzoneConfigText(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setDropzoneConfig(parsed)
        } catch { /* empty */ }
    }

    const handleButtonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setButtonConfigText(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setButtonConfig(parsed)
        } catch { /* empty */ }
    }

    const handleSingleImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSingleImageConfigText(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setSingleImageConfig(parsed)
        } catch { /* empty */ }
    }

    const handleMultiImageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMultiImageConfigText(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setMultiImageConfig(parsed)
        } catch { /* empty */ }
    }

    const handleMixedCardChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMixedCardConfigText(e.target.value)
        try {
            const parsed = JSON.parse(e.target.value)
            setMixedCardConfig(parsed)
        } catch { /* empty */ }
    }


    return (
        <div className="demo-wrapper">
            <h1 className="msg">Frontend Assignment by Dodo Payment</h1>


            <div className="upload-section">
                <div className="upload-header">
                    <h2 className="upload-title">Dropzone Upload</h2>
                    <Dialog.Root open={dropzoneOpen} onOpenChange={setDropzoneOpen}>
                        <Dialog.Trigger asChild>
                            <button className="edit-button">
                                <Pencil2Icon />
                                Edit Config
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                                <Dialog.Title className="dialog-title">Edit Dropzone Config</Dialog.Title>
                                <textarea
                                    value={dropzoneConfigText}
                                    onChange={handleDropzoneChange}
                                    className="config-textarea"
                                />
                                <div className="dialog-footer">
                                    <Dialog.Close asChild>
                                        <button className="close-button">Close</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className="upload-body">
                    <FileUpload config={dropzoneConfig} />
                </div>
            </div>

            <div className="upload-section">
                <div className="upload-header">
                    <h2 className="upload-title">Button Upload</h2>
                    <Dialog.Root open={buttonOpen} onOpenChange={setButtonOpen}>
                        <Dialog.Trigger asChild>
                            <button className="edit-button">
                                <Pencil2Icon />
                                Edit Config
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                                <Dialog.Title className="dialog-title">Edit Button Config</Dialog.Title>
                                <textarea
                                    value={buttonConfigText}
                                    onChange={handleButtonChange}
                                    className="config-textarea"
                                />
                                <div className="dialog-footer">
                                    <Dialog.Close asChild>
                                        <button className="close-button">Close</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className="upload-body">
                    <FileUpload config={buttonConfig} />
                </div>
            </div>

            <div className="upload-section">
                <div className="upload-header">
                    <h2 className="upload-title">Single Image Upload</h2>
                    <Dialog.Root open={singleImageOpen} onOpenChange={setSingleImageOpen}>
                        <Dialog.Trigger asChild>
                            <button className="edit-button">
                                <Pencil2Icon />
                                Edit Config
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                                <Dialog.Title className="dialog-title">Edit Single Image Config</Dialog.Title>
                                <textarea
                                    value={singleImageConfigText}
                                    onChange={handleSingleImageChange}
                                    className="config-textarea"
                                />
                                <div className="dialog-footer">
                                    <Dialog.Close asChild>
                                        <button className="close-button">Close</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className="upload-body">
                    <FileUpload config={singleImageConfig} />
                </div>
            </div>

            <div className="upload-section">
                <div className="upload-header">
                    <h2 className="upload-title">Multi Image Upload</h2>
                    <Dialog.Root open={multiImageOpen} onOpenChange={setMultiImageOpen}>
                        <Dialog.Trigger asChild>
                            <button className="edit-button">
                                <Pencil2Icon />
                                Edit Config
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="dialog-overlay" />
                            <Dialog.Content className="dialog-content">
                                <Dialog.Title className="dialog-title">Edit Multi Image Config</Dialog.Title>
                                <textarea
                                    value={multiImageConfigText}
                                    onChange={handleMultiImageChange}
                                    className="config-textarea"
                                />
                                <div className="dialog-footer">
                                    <Dialog.Close asChild>
                                        <button className="close-button">Close</button>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className="upload-body">
                    <FileUpload config={multiImageConfig} />
                </div>
            </div>

            <div className="demo-wrapper">
                <div className="upload-section">
                    <div className="upload-header">
                        <h2 className="upload-title">Mixed Card Upload</h2>
                        <Dialog.Root open={mixedCardOpen} onOpenChange={setMixedCardOpen}>
                            <Dialog.Trigger asChild>
                                <button className="edit-button">
                                    <Pencil2Icon />
                                    Edit Config
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="dialog-overlay" />
                                <Dialog.Content className="dialog-content">
                                    <Dialog.Title className="dialog-title">
                                        Edit Mixed Card Config
                                    </Dialog.Title>
                                    <textarea
                                        value={mixedCardConfigText}
                                        onChange={handleMixedCardChange}
                                        className="config-textarea"
                                    />
                                    <div className="dialog-footer">
                                        <Dialog.Close asChild>
                                            <button className="close-button">Close</button>
                                        </Dialog.Close>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                    <div className="upload-body">
                        <FileUpload config={mixedCardConfig} />
                    </div>
                </div>
            </div>

            <h1 className="msg">Made by Rohan Chaudhary</h1>

        </div>
    )
}
