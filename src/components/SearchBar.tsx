import { useEffect, useState } from "react";
import { Product } from "../interface/product";
import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";

interface SearchBarProps {
    products: Product[];
    onFilteredProductsChange: (filteredProducts: { [category: string]: Product[] }) => void;
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

type SortCriteria = 'priceDesc' | 'priceAsc' | 'stockDesc' | 'discountDesc' | 'None';

function SearchBar({ products, onFilteredProductsChange }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>('None');

    const handleCategoryChange = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
    };

    const handleSortChange = (criteria: SortCriteria) => {
        if (sortCriteria === criteria) {
            setSortCriteria('None');
        } else {
            setSortCriteria(criteria);
        }
    };

    const filterProducts = () => {
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

        // Sort the products based on the selected criteria
        filteredProducts = [...filteredProducts].sort((a, b) => {
            switch (sortCriteria) {
                case 'priceDesc':
                    return b.price - a.price;
                case 'priceAsc':
                    return a.price - b.price;
                case 'stockDesc':
                    return b.stock - a.stock;
                case 'discountDesc':
                    return b.discountPercentage - a.discountPercentage;
                default:
                    return 0;
            }
        });

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

        onFilteredProductsChange(groupedProducts);
    };

    useEffect(() => {
        filterProducts();
    }, [searchTerm, minPrice, maxPrice, selectedCategory, sortCriteria]);

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
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-sort">
                            Sort by: {sortCriteria.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortChange('priceDesc')}>Price (High to Low)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('priceAsc')}>Price (Low to High)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('stockDesc')}>Stock (High to Low)</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('discountDesc')}>Discount (High to Low)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Button variant="primary" onClick={filterProducts}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBar;