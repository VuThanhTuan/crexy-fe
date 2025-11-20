
import { cn } from "@/lib/utils";
// Removed unused FC import

interface ColorSizeSelectorProps {
    type: "color" | "size";
    options: (string | { name: string; colorCode: string })[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export const ColorSizeSelector = ({ 
    type, 
    options, 
    selectedValue, 
    onValueChange,
    className 
}: ColorSizeSelectorProps) => {
    const isColor = type === "color"
    
    return (
        <div className={cn("space-y-3", className)}>
            <h3 className="text-sm font-semibold text-gray-900">
                {isColor ? "Màu sắc" : "Size"}
            </h3>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const label = typeof option === "object" ? option.name : option;
                    const colorCode = typeof option === "object" ? option.colorCode : undefined;
                    return (
                        <button
                            key={label}
                            onClick={() => onValueChange(label)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium border rounded-md transition-colors flex items-center gap-2",
                                selectedValue === label
                                    ? isColor
                                        ? "border-gray-900 bg-gray-900 text-white"
                                        : "border-crexy-primary bg-crexy-primary text-white"
                                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            )}
                        >
                            {isColor && colorCode ? (
                                <span
                                    className="inline-block w-5 h-5 rounded-full border mr-2"
                                    style={{ backgroundColor: colorCode, borderColor: colorCode }}
                                />
                            ) : null}
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}
