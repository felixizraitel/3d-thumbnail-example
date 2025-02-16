// import { useModelThumbnail } from "@autoquote3d/3d-thumbnail-renderer";
import { useModelThumbnail } from "@autoquote3d/3d-thumbnail-renderer";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
interface ModelThumbnailProps {
  file: File;
  bgColor: string;
}

export function ModelThumbnail({ file, bgColor }: ModelThumbnailProps) {
  const [objectUrl, setObjectUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const {
    data: thumbnail,
    error,
    loading,
    progress,
  } = useModelThumbnail({
    url: objectUrl,
    fileType: file.name.split(".").pop()?.toLowerCase() || "",
    color: bgColor,
  });

  if (loading) {
    return (
      <div className="aspect-square flex items-center justify-center bg-muted/10 rounded-lg">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-square flex flex-col items-center justify-center gap-2 bg-muted/10 rounded-lg p-4">
        <AlertCircle className="h-6 w-6 text-destructive" />
        <p className="text-sm text-muted-foreground text-center">{error}</p>
        <p className="text-xs text-muted-foreground truncate w-full text-center">
          {file.name}
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-square bg-muted/10 rounded-lg">
      <img
        src={thumbnail || ""}
        alt={`Thumbnail for ${file.name}`}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
}
