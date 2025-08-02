# 📦 file-upload-lib

A fully customizable, accessible, and config-driven file upload component library built with **React**, **TypeScript**, **Radix UI**, and **your own CSS** (Tailwind or custom styles) — inspired by `shadcn/ui`.

Supports multiple upload variants, JSON-based behavior and styling, previews, file validation, and maximum limits — perfect for integrating modular, user-friendly file upload in real-world apps.

---

## 🚀 Features

- 🔘 Button Upload
- 📥 Dropzone Upload (Drag & Drop)
- 🖼️ Single Image Upload
- 🖼️🖼️ Multi Image Grid Upload
- 🧾 Mixed File Card/Table Upload
- ⚙️ JSON-configurable UI and behavior
- ✅ Type-safe with `FileUploadConfig`
- ♿ Accessible with Radix UI
- 🧪 Local and npm-installable

---

## 📦 Installation

### 🔧 For local development and testing

From the library root:
```bash
npm pack
```

Then install in another project:
```bash
npm install /absolute/path/to/file-upload-lib-1.0.0.tgz
```

---

## 🧠 Usage

```tsx
import { FileUpload } from 'file-upload-lib'
import type { FileUploadConfig } from 'file-upload-lib'

const config: FileUploadConfig = {
  variant: 'dropzone',
  maxFileSizeMB: 5, 
    maxFileLimit: 5,
  fileTypes: ['jpg', 'png'],
  theme: {
    size: 'md',
    radius: 'md',
    iconPosition: 'left'
  },
  labels: {
    dropzoneText: 'Drop your files here or click to upload'
  }
}

<FileUpload config={config} />
```

---

## 🔧 Supported Variants

| Variant          | Description                              |
|------------------|------------------------------------------|
| `dropzone`       | Drag-and-drop zone with preview cards     |
| `button`         | Upload button with file info list         |
| `single-image`   | Upload a single image with large preview  |
| `multi-image`    | Upload multiple images in grid layout     |
| `mixed-card`     | Mixed file preview with card actions      |

---

## ✨ JSON Config Schema

```json
{
  "variant": "dropzone",
  "maxFileSizeMB": 5,
  "maxFileLimit": 5,
  "fileTypes": [
    "jpg",
    "png",
    "pdf"
  ],
  "theme": {
    "size": "md",
    "radius": "md",
    "iconPosition": "left"
  },
  "labels": {
    "dropzoneText": "Drop files here",
    "buttonText": "Upload Files",
    "singleImageText": "Upload a single image",
    "multiImageText": "Upload multiple images",
    "mixedCardText": "Upload documents"
  }
}
```

---

## 🧪 Live Demo

Visit: [https://file-upload-lib.vercel.app](https://file-upload-lib.vercel.app)

- Test each variant
- Live JSON config editor
- Real-time component preview

---

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Radix UI Primitives
- TailwindCSS or vanilla CSS
- JSON-driven props
- No backend — all mock uploads

---

## 🔧 Dev & Build

```bash
# Run dev demo
npm run dev

# Build demo for Vercel
npm run build

# Build library for npm
npm run lib:build

# Pack npm tarball
npm pack
```

---

## 📁 Project Structure

```
src/
  index.ts                    # library entry
  main.tsx                    # demo site entry
  components/
    file-upload/
      FileUpload.tsx
      config-schema.ts
      variants/
        DropzoneUpload.tsx
        ButtonUpload.tsx
        SingleMaxImageUpload.tsx
        MultiImageUpload.tsx
        MixedCardUpload.tsx
```

---

## 📌 License

MIT — use freely, credit optionally ✨