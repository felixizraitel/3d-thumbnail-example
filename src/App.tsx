import { useState } from "react";
import { ColorPicker } from "./components/ColorPicker";
import { FileUpload } from "./components/FileUpload";
import { ModelThumbnail } from "./components/ModelThumbnail";
import { Card } from "./components/ui/card";

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [bgColor, setBgColor] = useState("#ffffff");

  return (
    <div className="container mx-auto p-8 space-y-8">
      <Card className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">3D Model Viewer</h1>

        <ColorPicker color={bgColor} onChange={setBgColor} />

        <FileUpload
          files={files}
          onFilesChange={(f) => {
            console.log(f);
            setFiles(f);
          }}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <ModelThumbnail key={index} file={file} bgColor={bgColor} />
          ))}
        </div>
      </Card>
    </div>
  );
}
