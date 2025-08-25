import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type InfoBoxProps = {
    className?: string
    hasTitle?: boolean
    title: string
    description: string
    buttonText: string
}

export const InfoBox = ({ className, hasTitle = true, title, description, buttonText }: InfoBoxProps) => {
    return (
        <div className={cn("w-[440px] h-[242px] bg-white p-3 flex", className)}>
            <div className="relative z-20 mx-auto max-w-3xl bg-white text-center border-4 border-crexy-secondary flex-1 flex flex-col justify-between items-center p-4">
                {hasTitle && <p className="text-md font-semibold text-crexy-secondary">{title}</p>}
                <h2 className="max-w-[240px] mt-3 text-2xl font-extrabold leading-tight text-crexy-secondary">
                    {description}
                </h2>

                <Button className="mt-4 font-bold text-crexy-secondary border-crexy-secondary w-[140px]" variant="primary" size="xl">{buttonText}</Button>
            </div>
        </div>
    );
};