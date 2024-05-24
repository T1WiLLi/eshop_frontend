import { useEffect, useState } from "react";
import { Product } from "../interface/product";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import "../styles/components/searchbar.css";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
    /**
     * The array of products to be filtered.
     */
    products: Product[];
    /**
     * Callback function triggered when filtered products change.
     */
    onFilteredProductsChange: (filteredProducts: { [category: string]: Product[] }) => void;
}

/**
 * A dictionary mapping main categories to their subcategories.
 */
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

/**
 * Interface for defining sorting criteria.
 */
type SortCriteria = 'priceDesc' | 'priceAsc' | 'stockDesc' | 'discountDesc' | 'None';

/**
 * Component for filtering and sorting products.
 */
function SearchBar({ products, onFilteredProductsChange }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortCriteria, setSortCriteria] = useState<SortCriteria>('None');

    /**
     * Handles category selection.
     * 
     * @param category - The selected category.
     */
    const handleCategoryChange = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('');
        } else {
            setSelectedCategory(category);
        }
    };

    /**
     * Handles sort criteria change.
     * 
     * @param criteria - The selected sort criteria.
     */
    const handleSortChange = (criteria: SortCriteria) => {
        if (sortCriteria === criteria) {
            setSortCriteria('None');
        } else {
            setSortCriteria(criteria);
        }
    };

    /**
     * Filters products based on search term, price range, category, and sort criteria.
     */
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
        <Form className="search-bar-container">
            <Row className="align-items-center">
                <Col md={4} className="mb-3 mb-md-0">
                    <div className="search-input-container">
                        <Form.Control
                            type="text"
                            placeholder=""
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-input-placeholder">
                            Search Products
                        </span>
                    </div>
                </Col>
                <Col md={2} className="mb-3 mb-md-0">
                    <div className="price-input-container">
                        <Form.Control
                            type="number"
                            placeholder=""
                            value={minPrice !== null ? minPrice : ''}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val === 0) {
                                    setMinPrice(null);
                                } else {
                                    setMinPrice(val);
                                }
                            }}
                            className="price-input"
                            onFocus={(e) => e.target.classList.add('focused')}
                            onBlur={(e) => e.target.classList.remove('focused')}
                        />
                        <span className="price-input-placeholder">Min Price</span>
                    </div>
                </Col>
                <Col md={2} className="mb-3 mb-md-0">
                    <div className="price-input-container">
                        <Form.Control
                            type="number"
                            placeholder=""
                            value={maxPrice !== null ? maxPrice : ''}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (val === 0) {
                                    setMaxPrice(null);
                                } else {
                                    setMaxPrice(val);
                                }
                            }}
                            className="price-input"
                            onFocus={(e) => e.target.classList.add('focused')}
                            onBlur={(e) => e.target.classList.remove('focused')}
                        />
                        <span className="price-input-placeholder">Max Price</span>
                    </div>
                </Col>
                <Col md={2} className="mb-3 mb-md-0">
                    <Dropdown className="category-dropdown">
                        <Dropdown.Toggle variant="secondary" id="dropdown-categories" className="category-dropdown-toggle">
                            {selectedCategory ? selectedCategory.replace('-', ' ') : 'Select a category'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(categories).map((mainCategory) => (
                                <Dropdown.Item
                                    key={mainCategory}
                                    onClick={() => handleCategoryChange(mainCategory)}
                                    active={selectedCategory === mainCategory}>
                                    {mainCategory.replace('-', ' ')}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2} className="mb-3 mb-md-0">
                    <Dropdown className="sort-dropdown">
                        <Dropdown.Toggle variant="secondary" id="dropdown-sort" className="sort-dropdown-toggle">
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
            </Row>
        </Form>
    );
}

export default SearchBar;