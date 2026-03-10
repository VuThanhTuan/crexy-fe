import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    className?: string
}

export const QuantitySelector = ({ 
    value, 
    onChange, 
    min = 1, 
    max = 99,
    className 
}: QuantitySelectorProps) => {
    const handleDecrease = () => {
        if (value > min) {
            onChange(value - 1)
        }
    }

    const handleIncrease = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }

    return (
        <div className={cn("flex items-center border w-[100px] border-gray-300 rounded-md", className)}>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none border-r-0"
                onClick={handleDecrease}
                disabled={value <= min}
            >
                <Minus className="h-3 w-3" />
            </Button>
            
            <div className="flex items-center justify-center h-8 w-12 border-x border-gray-300">
                <span className="text-sm font-medium">{value}</span>
            </div>
            
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none border-l-0"
                onClick={handleIncrease}
                disabled={value >= max}
            >
                <Plus className="h-3 w-3" />
            </Button>
        </div>
    )
}
