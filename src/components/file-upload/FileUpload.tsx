import type { FileUploadConfig} from './ config-schema'
import { DropzoneUpload } from '../variants/DropzoneUpload'
import {ButtonUpload} from "../variants/ButtonUpload";
import {SingleMaxImageUpload} from "../variants/SingleMaxImageUpload";
import {MultiImageUpload} from "../variants/MultiImageUpload";
import {MixedCard} from "../variants/MixedCard";

export const FileUpload = ({ config }: { config: FileUploadConfig }) => {
    switch (config.variant) {
        case 'mixed-card':
            return <MixedCard config={config} />
        case 'multi-image':
            return <MultiImageUpload config={config} />
        case 'single-image':
            return <SingleMaxImageUpload config={config} />
        case 'dropzone':
            return <DropzoneUpload config={config} />
        case 'button':
            return <ButtonUpload config={config} />
        default:
            return <p>Unsupported variant</p>
    }
}
