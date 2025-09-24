
import { Button } from "@/components/ui/button"
import Bg3 from "@/public/images/Bg3.jpg"
import { Product, ProductBox } from "@/components/ProductBox";

const products: Product[] = [
    {
        id: "1",
        name: "Product 1",
        price: 100000,
        image: "/images/product1.jpg",
        behindImage: "/images/Product2.jpg",
        collectionName: "Collection 1",
        discount: 10,
        description: "Description for Product 1",
    },
    {
        id: "2",
        name: "Product 2",
        price: 200000,
        image: "/images/List1.jpg",
        behindImage: "/images/Product2.jpg",
        collectionName: "Collection 2",
        discount: 20,
        description: "Description for Product 2",
    },
    {
        id: "3",
        name: "Product 3",
        price: 300000,
        image: "/images/List2.jpg",
        behindImage: "/images/Product2.jpg",
        collectionName: "Collection 3",
        description: "Description for Product 3",
    },
    {
        id: "4",
        name: "Product 4",
        price: 400000,
        image: "/images/Product2.jpg",
        behindImage: "/images/Product2.jpg",
        collectionName: "Collection 4",
        description: "Description for Product 4",
    },
]

export const HomeProducts: React.FC = () => {
    return (
        <div id="home-products" className="w-full h-[100vh] relative flex flex-col bg-linear-to-r from-cyan-300 to-pink-300">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-10"></div>
            <div id="home-product-title" className="z-11 text-crexy-secondary text-5xl w-full text-center p-[30px]">Featured Productions</div>
            <div id="home-product-list" className="w-full z-11 flex-1 flex flex-row gap-2 pl-1 pr-1">
                {products.map((product) => (
                    <ProductBox key={product.id} product={product} className="w-[470px] h-[650px]!" />
                ))}
            </div>
            <div id="home-product-button" className="z-11 h-[140px] flex justify-center items-center">
                <Button variant="primary" size="xl">View All</Button>
            </div>

        </div>
    )
}