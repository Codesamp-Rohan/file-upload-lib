export type FileUploadConfig = {
    variant: 'button' | 'dropzone' | 'single-image' | 'multi-image' | 'mixed-card'
    maxFileSizeMB: number
    fileTypes: string[]
    theme: {
        size: 'sm' | 'md' | 'lg'
        radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
        iconPosition: 'left' | 'right'
    }
    labels: {
        buttonText?: string
        dropzoneText?: string,
        singleImageText?: string,
        multiImageText?: string,
        mixedCardText?: string,
    }
}
