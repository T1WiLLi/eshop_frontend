import { useEffect, useState } from "react";
import { Fetcher } from "../api/fetch"
import CategoryGrid from "../components/CategoryGrid";
import { Product } from "../interface/product";
import "../styles/components/shop.css";

function shop() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productsData = await new Fetcher().fetchAllProduct();
                setProducts(productsData);
            } catch (error: any) {
                console.error('Error fetching product data:', error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="shop">
            <h1>Shop</h1>
            <CategoryGrid products={products} />
        </div>
    )
}

export default shop