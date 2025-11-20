import React from "react";
import { cn } from "@/lib/utils";
import type { ColorOption } from "./ProductInfo";

interface ColorSelectorProps {
    options: ColorOption[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ options, selectedValue, onValueChange, className }) => {
    return (
        <div className={cn("space-y-3", className)}>
            <h3 className="text-sm font-semibold text-gray-900">Màu sắc</h3>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => onValueChange(option.name)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium border rounded-md transition-colors flex items-center gap-2",
                            selectedValue === option.name
                                ? "border-gray-900"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                        )}
                    >
                        <span
                            className="w-5 h-5 rounded-full border border-gray-500 mr-2"
                            style={{ backgroundColor: option.colorCode }}
                        />
                        {option.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
