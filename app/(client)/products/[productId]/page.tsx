import TopBar from "../../_components/top-bar"
import { Footer } from "../../_components/footer"
import { ProductImageGallery } from "./_components/ProductImageGallery"
import { ProductInfo } from "./_components/ProductInfo"
import { ProductDetails } from "./_components/ProductDetails"
import { ProductDescription } from "./_components/ProductDescription"
import { SimilarProducts } from "./_components/SimilarProducts"
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb"
import { fetchProductById, fetchRelatedProducts, extractImages, mapVariants, uniqueDefined } from "@/services/products.service";
import type { Product as CardProduct } from "@/components/ProductBox";

type PageProps = { params: Promise<{ productId: string }> };

export default async function ProductDetailPage({ params }: PageProps) {
    const { productId } = await params;

    let product: Awaited<ReturnType<typeof fetchProductById>> | null = null;
    try {
        product = await fetchProductById(productId);
    } catch {
        product = null;
    }

    if (!product) {
        return (
            <div className="min-h-screen pt-30 bg-gray-50 overflow-y-auto">
                <TopBar variant="solid" />
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
                        <p className="text-gray-600">Không tìm thấy sản phẩm với ID: {productId}</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const images = extractImages(product);
    const variants = mapVariants(product);
    // Build color options as array of { name, colorCode }
    const colorOptions = Array.from(
        new Map(
            (product.productVariants ?? [])
                .filter(v => v.productColor?.name && v.productColor?.colorCode)
                .map(v => [v.productColor!.name, { name: v.productColor!.name, colorCode: v.productColor!.colorCode }])
        ).values()
    );
    const sizes = uniqueDefined(variants.map(v => v.sizeName));

    // Compute discount percent if available (supports percent type; fallback to value if looks like percent)
    const discountPercent = (() => {
        const d = product.discount as undefined | { discountValue?: number; discountType?: string };
        if (!d) return undefined;
        const value = d.discountValue;
        const type = d.discountType;
        if (typeof value !== "number") return undefined;
        if (typeof type === "string" && type.toUpperCase().includes("PERCENT")) return value;
        return undefined;
    })();

    // Related products
    const relatedRaw = product.categoryId ? await fetchRelatedProducts(product.categoryId, 10) : [];
    const related: CardProduct[] = relatedRaw.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.primaryImageUrl ?? "/images/List1.jpg",
        behindImage: p.secondaryImageUrl ?? p.primaryImageUrl ?? "/images/List2.jpg",
        description: "",
        collectionName: product?.category?.name ?? "",
        discount: p.discount?.discountValue,
        productVariants: p.productVariants,
    }));

    return (
        <div className="bg-gray-50 pt-30">
            {/* Header */}
            <TopBar variant="solid" />

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <ProductBreadcrumb productName={product.name} />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 lg:pb-16">
                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:mb-16">
                    {/* Product Images */}
                    <ProductImageGallery
                        images={images}
                        productName={product.name}
                    />

                    {/* Product Info */}
                    <ProductInfo
                        product={{
                            id: product.id,
                            name: product.name,
                            basePrice: product.price,
                            description: product.description,
                            collectionName: product?.category?.name ?? "",
                            discountPercent,
                        }}
                        variants={variants}
                        colors={colorOptions}
                        sizes={sizes}
                    />
                </div>

                {/* Product Details */}
                <div className="mb-8 lg:mb-16">
                    <ProductDetails attributes={product.productAttributes ?? []} />
                </div>

                {/* Product Description */}
                <div className="mb-8 lg:mb-16">
                    <ProductDescription description={product.description} />
                </div>
            </div>
            {/* Similar Products */}
            <SimilarProducts products={related} />
        </div>
    )
}
