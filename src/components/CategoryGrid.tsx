import React, { useState } from 'react';
import { Product } from '../interface/product';
import { Col, Row, Button } from 'react-bootstrap';
import ProductTemplate from './ProductTemplate';
import "../styles/components/categoryGrid.css";

interface CategoryGridProps {
    products: { [category: string]: Product[] };
}

function CategoryGrid({ products }: CategoryGridProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const toggleCategoryExpansion = (category: string) => {
        setExpandedCategories(prevState => {
            if (prevState.includes(category)) {
                return prevState.filter((cat: string) => cat !== category);
            } else {
                return [...prevState, category];
            }
        });
    };

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
