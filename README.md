# 📦 file-upload-lib

A fully customizable, accessible, and config-driven file upload component library built with **React**, **TypeScript**, **Radix UI**, and **TailwindCSS (or vanilla CSS)** — inspired by `shadcn/ui`.

Supports multiple UI variants, JSON-based configuration, previews, and upload rules — ideal for integrating flexible file uploads into design systems or products.

---

## 🚀 Features

- 🔘 Button Upload
- 📥 Dropzone Upload (Drag & Drop)
- 🖼️ Single Image Upload
- 🖼️🖼️ Multi Image Grid Upload
- 🧾 Mixed File Card/Table Upload
- ⚙️ Configurable via JSON
- ✅ Type-safe with `FileUploadConfig`
- 🧑‍💻 Developer-friendly and accessible

---

## 📦 Installation

```bash
npm install file-upload-lib
# OR
pnpm add file-upload-lib
```

Or use it locally:

```bash
pnpm pack
```

---

## 🧠 Usage

```tsx
import { FileUpload } from 'file-upload-lib'

const config = {
  variant: 'dropzone',
  maxFileSizeMB: 5,
  fileTypes: ['jpg', 'png'],
  theme: {
    size: 'md',
    radius: 'md',
    iconPosition: 'left'
  },
  labels: {
    dropzoneText: 'Drop your files here or click'
  }
}

<FileUpload config={config} />
```

---

## 🔧 Supported Variants

| Variant             | Description                           |
|---------------------|---------------------------------------|
| `dropzone`          | Drag-and-drop UI with previews        |
| `button`            | Simple upload button with list        |
| `single-image`      | Upload + preview one image            |
| `multi-image-grid`  | Upload multiple images in a grid      |
| `file-card`         | Upload files with rich card previews  |
| `file-table`        | (optional) For future tabular layout  |

---

## ✨ JSON Config Structure

```json
{
  "variant": "dropzone",
  "maxFileSizeMB": 5,
  "fileTypes": ["jpg", "png"],
  "theme": {
    "size": "md",
    "radius": "md",
    "iconPosition": "left"
  },
  "labels": {
    "dropzoneText": "Drop files here",
    "buttonText": "Upload Files",
    "singleImageText": "Upload a single image"
  }
}
```

---

## 🧪 Demo

Includes a `/demo` page with:
- Live configuration editor (Radix Dialog + JSON)
- All variants rendered
- Real-time switching via JSON

---

## 🛠 Tech Stack

- React + TypeScript
- TailwindCSS or Custom CSS
- Radix UI Primitives
- Local image previews (no backend)

---

## 💡 Development

```bash
pnpm install
pnpm dev
```

To create a local `.tgz` file for testing:

```bash
pnpm pack
```

---

## 📂 File Structure

```
src/
  components/
    file-upload/
      FileUpload.tsx
      config-schema.ts
      variants/
        DropzoneUpload.tsx
        ButtonUpload.tsx
        SingleMaxImageUpload.tsx
        MultiImageUpload.tsx
        FileTableUpload.tsx (optional)
```

---

## 📌 License

MIT — use freely, attribute optionally ✨