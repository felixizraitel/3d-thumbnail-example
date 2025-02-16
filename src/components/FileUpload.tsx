import { X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      // "/*": [".obj", ".stl"],
      "application/vnd.ms-pkistl": [".stl"],
      "application/x-wavefront-obj": [".obj"],
    },
    onDrop: (acceptedFiles) => {
      onFilesChange([...files, ...acceptedFiles]);
    },
  });

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop 3D files here, or click to select files</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <Card key={index} className="p-4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeFile(index)}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="truncate">{file.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
