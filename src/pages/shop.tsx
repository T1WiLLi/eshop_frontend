import { useEffect, useState } from "react";
import { Fetcher } from "../api/fetch"
import CategoryGrid from "../components/CategoryGrid";
import { Product } from "../interface/product";
import "../styles/components/shop.css";
import { Container } from "react-bootstrap";

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
        <div className="shop-holder">
            <Container className="shop">
                <CategoryGrid products={products} />
            </Container>
        </div>
    )
}

export default shop