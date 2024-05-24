import { useEffect, useState } from "react";
import { Fetcher } from "../api/fetch";
import CategoryGrid from "../components/CategoryGrid";
import { Product } from "../interface/product";
import "../styles/pages/shop.css";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

type CategoryKey = 'electronic' | 'skin-care' | 'home' | 'groceries' | 'accessories' | 'clothes' | 'vehicule';

const categories: Record<CategoryKey, string[]> = {
    electronic: ['smartphones', 'laptops', 'mobile-accessories', 'tablets'],
    'skin-care': ['fragrances', 'skincare', 'beauty', 'skin-care'],
    home: ['home-decoration', 'furniture', 'lighting', 'kitchen-accessories'],
    groceries: ['groceries'],
    accessories: ['mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses'],
    clothes: ['womens-dresses', 'mens-shirts', 'tops'],
    vehicule: ['vehicle', 'motorcycle', 'automotivev']
};

function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<{ [category: string]: Product[] }>({});

    useEffect(() => {
        async function fetchData() {
            try {
                const productsData = await Fetcher.getInstance().fetchAllProduct();
                setProducts(productsData);

                // Initialize filteredProducts with the fetched products grouped by category
                const groupedProducts: { [category: string]: Product[] } = {};

                productsData.forEach((product) => {
                    const superCategory = (Object.keys(categories) as CategoryKey[]).find((key) =>
                        categories[key].includes(product.category)
                    );
                    if (superCategory) {
                        if (!groupedProducts[superCategory]) {
                            groupedProducts[superCategory] = [];
                        }
                        groupedProducts[superCategory].push(product);
                    } else {
                        if (!groupedProducts['diverse']) {
                            groupedProducts['diverse'] = [];
                        }
                        groupedProducts['diverse'].push(product);
                    }
                });

                setFilteredProducts(groupedProducts);
            } catch (error: any) {
                console.error('Error fetching product data:', error.message);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (filteredProducts: { [category: string]: Product[] }) => {
        setFilteredProducts(filteredProducts);
    };

    return (
        <div className="shop-holder">
            <Container className="shop">
                <SearchBar products={products} onFilteredProductsChange={handleSearch} />
                <CategoryGrid products={filteredProducts} />
            </Container>
        </div>
    );
}

export default Shop;
