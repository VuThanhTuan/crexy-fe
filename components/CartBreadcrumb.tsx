import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export type BreadcrumbItem = {
  label: string
  href?: string
  showHomeIcon?: boolean
}

type Props = {
  items: BreadcrumbItem[]
  className?: string
}

export const CartBreadcrumb = ({ items, className }: Props) => {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index !== 0 && <ChevronRight className="w-4 h-4 mx-1" />}
              {item.href && !isLast ? (
                <Link href={item.href} className="flex items-center hover:text-crexy-primary">
                  {item.showHomeIcon && <Home className="w-4 h-4 mr-1" />}
                  {item.label}
                </Link>
              ) : (
                <span className={`flex items-center ${isLast ? "text-gray-900 font-medium" : ""}`}>
                  {item.showHomeIcon && <Home className="w-4 h-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default CartBreadcrumb


