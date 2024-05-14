import React, { useState } from 'react';
import { Product } from '../interface/product';
import { Col, Row, Button } from 'react-bootstrap';
import ProductTemplate from './ProductTemplate';
import "../styles/components/categoryGrid.css";

interface CategoryGridProps {
    products: Product[];
}

function CategoryGrid({ products }: CategoryGridProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const categories = {
        electronic: ['smartphones', 'laptops', 'automotive', 'motorcycle'],
        'skin-care': ['fragrances', 'skincare'],
        'home-decoration': ['home-decoration', 'furniture', 'lighting'],
        groceries: ['groceries'],
        accessories: ['mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses'],
        clothes: ['womens-dresses', 'mens-shirts', 'tops']
    };

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
        const initialProductCount = 6; // Number of products to display initially

        return (
            <React.Fragment key={category}>
                <Row onClick={() => toggleCategoryExpansion(category)} style={{ cursor: 'pointer' }}>
                    <Col>
                        <h3>{categoryName.toUpperCase()}</h3>
                    </Col>
                    <Col className="text-right">
                        <Button variant="link">{isExpanded ? 'Collapse' : 'Expand'}</Button>
                    </Col>
                </Row>
                <Row className='d-flex gap-2'>
                    {products.slice(0, initialProductCount).map(product => (
                        <Col key={product.id} className='product-col'>
                            <ProductTemplate product={product} />
                        </Col>
                    ))}
                </Row>
                {isExpanded && (
                    <Row className='d-flex gap-2'>
                        {products.slice(initialProductCount).map(product => (
                            <Col key={product.id} className='product-col'>
                                <ProductTemplate product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </React.Fragment>
        );
    };


    const diverseProducts = products.filter(product => !Object.values(categories).flat().includes(product.category));

    return (
        <div>
            {Object.entries(categories).map(([category, subCategories]) => {
                const categoryProducts = products.filter(product => subCategories.includes(product.category));
                if (categoryProducts.length > 0) {
                    return renderCategoryRow(category, categoryProducts);
                }
                return null;
            })}
            {diverseProducts.length > 0 && renderCategoryRow('diverse', diverseProducts)}
        </div>
    );
}

export default CategoryGrid;
