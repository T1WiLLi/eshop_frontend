import { useState } from "react";
import { Product } from "../interface/product";
import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";

interface SearchBarProps {
    products: Product[];
    onSearch: (filteredProducts: { [category: string]: Product[] }) => void;
}

const categories: { [key: string]: string[] } = {
    electronic: ['smartphones', 'laptops', 'automotive', 'motorcycle'],
    'skin-care': ['fragrances', 'skincare'],
    'home-decoration': ['home-decoration', 'furniture', 'lighting'],
    groceries: ['groceries'],
    accessories: [
        'mens-watches',
        'womens-watches',
        'womens-bags',
        'womens-jewellery',
        'sunglasses',
    ],
    clothes: ['womens-dresses', 'mens-shirts', 'tops'],
};

function SearchBar({ products, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleCategoryChange = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
    };

    const handleSearch = () => {
        let filteredProducts = products;

        // Filter by search term
        if (searchTerm) {
            const searchRegex = new RegExp(searchTerm, 'i');
            filteredProducts = filteredProducts.filter(
                (product) =>
                    searchRegex.test(product.title) ||
                    searchRegex.test(product.brand) ||
                    searchRegex.test(product.category)
            );
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            filteredProducts = filteredProducts.filter(
                (product) =>
                    (minPrice ? product.price >= minPrice : true) &&
                    (maxPrice ? product.price <= maxPrice : true)
            );
        }

        // Filter by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) =>
                categories[selectedCategory].includes(product.category)
            );
        }

        // Group filtered products by category
        const groupedProducts: { [category: string]: Product[] } = {};
        filteredProducts.forEach((product) => {
            const superCategory = Object.keys(categories).find((key) =>
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

        onSearch(groupedProducts);
    };

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Min Price"
                        value={minPrice !== null ? minPrice : ''}
                        onChange={(e) => setMinPrice(e.target.value !== '' ? parseInt(e.target.value) : null)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice !== null ? maxPrice : ''}
                        onChange={(e) => setMaxPrice(e.target.value !== '' ? parseInt(e.target.value) : null)}
                    />
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-categories">
                            {selectedCategory ? selectedCategory.replace('-', ' ') : 'Select a category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(categories).map((mainCategory) => (
                                <Dropdown.Item
                                    key={mainCategory}
                                    onClick={() => handleCategoryChange(mainCategory)}
                                    active={selectedCategory === mainCategory}
                                >
                                    {mainCategory.replace('-', ' ')}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBar;