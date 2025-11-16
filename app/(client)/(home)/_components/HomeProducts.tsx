
import { Button } from "@/components/ui/button"
import { ProductBox, Product } from "@/components/ProductBox";
import { useEffect } from "react"
import useHomeProductsStore from "@/hooks/use-home-products-store"

// HomeProducts fetches top 4 latest products (cached in store)

export const HomeProducts: React.FC = () => {
    const products = useHomeProductsStore((s) => s.products) as Product[]
    const fetchTopProducts = useHomeProductsStore((s) => s.fetchTopProducts)

    useEffect(() => {
        fetchTopProducts(4)
    }, [fetchTopProducts])

    return (
        <div id="home-products" className="w-full h-[100vh] relative flex flex-col">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-10"></div>
            <div id="home-product-title" className="z-11 text-crexy-secondary text-5xl w-full text-center p-[30px] uppercase">Featured Productions</div>
            <div id="home-product-list" className="w-full z-11 flex-1 flex flex-row gap-2 pl-1 pr-1">
                {products.map((product: Product) => (
                    <ProductBox key={product.id} product={product} className="w-[470px] h-[650px]!" />
                ))}
            </div>
            <div id="home-product-button" className="z-11 h-[140px] flex justify-center items-center">
                <Button variant="primary" size="xl">View All</Button>
            </div>

        </div>
    )
}