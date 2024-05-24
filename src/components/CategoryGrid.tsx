import React, { useState } from 'react';
import { Product } from '../interface/product';
import { Col, Row, Button } from 'react-bootstrap';
import ProductTemplate from './ProductTemplate';
import "../styles/components/categoryGrid.css";

/**
 * Props for the CategoryGrid component.
 */
interface CategoryGridProps {
    /**
     * An object containing products grouped by category.
     */
    products: { [category: string]: Product[] };
}

/**
 * A component that displays products in a grid grouped by category.
 */
function CategoryGrid({ products }: CategoryGridProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    /**
     * Toggles the expansion of a category.
     * 
     * @param category - The category to toggle.
     */
    const toggleCategoryExpansion = (category: string) => {
        setExpandedCategories(prevState => {
            if (prevState.includes(category)) {
                return prevState.filter((cat: string) => cat !== category);
            } else {
                return [...prevState, category];
            }
        });
    };

    /**
     * Renders a row for a category, including products.
     * 
     * @param category - The category name.
     * @param products - The products in the category.
     * @returns A JSX element representing the category row.
     */
    const renderCategoryRow = (category: string, products: Product[]) => {
        const categoryName = category.replace('-', ' ');
        const isExpanded = expandedCategories.includes(category);
        const initialProductCount = 4;

        return (
            <React.Fragment key={category}>
                <Row className="flex-row category-title">
                    <Col className="d-flex w-75" style={{ flex: 'none', cursor: 'pointer' }} onClick={() => toggleCategoryExpansion(category)}>
                        <h3 style={{ color: "white" }}>{categoryName.toUpperCase()}</h3>
                        <Button variant="link" style={{ color: "white" }}>
                            {isExpanded ? (
                                <i className="fa-solid fa-minus"> See Less</i>
                            ) : (
                                <i className="fa-solid fa-plus"> See More</i>
                            )}
                        </Button>
                    </Col>
                </Row>
                <div className="container-fluid d-flex product-row-holder">
                    {products.map((product, index) => (
                        <Col key={product.id} className="product-col mx-1">
                            {(index < initialProductCount || isExpanded) && <ProductTemplate key={product.id} product={product} />}
                        </Col>
                    ))}
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            {Object.keys(products).map(category => {
                const categoryProducts = products[category];
                if (categoryProducts.length > 0) {
                    return renderCategoryRow(category, categoryProducts);
                }
                return null;
            })}
        </div>
    );
}

export default CategoryGrid;
