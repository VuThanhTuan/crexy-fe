import React from "react";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
    options: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    className?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ options, selectedValue, onValueChange, className }) => {
    return (
        <div className={cn("space-y-3", className)}>
            <h3 className="text-sm font-semibold text-gray-900">Size</h3>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onValueChange(option)}
                        className={cn(
                            "px-4 py-2 text-sm font-medium border rounded-md transition-colors",
                            selectedValue === option
                                ? "border-crexy-primary bg-crexy-primary text-white"
                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};
