import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="color">Background Color</Label>
      <Input
        type="color"
        id="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 h-10"
      />
    </div>
  );
}
