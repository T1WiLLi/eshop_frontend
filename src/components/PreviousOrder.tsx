import { useEffect, useState } from "react";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import "../styles/components/previousOrder.css";
import { CartItem, Order } from "../interface/Orders";
import { Fetcher } from "../api/fetch";
import { Product } from "../interface/product";

const PreviousOrders = () => {
    const [previousOrders, setPreviousOrders] = useState<Order[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchPreviousOrders = async () => {
            try {
                const cartResponse = await Fetcher.getInstance().fetchAllCart() as Order[];
                const productResponse = await Fetcher.getInstance().fetchAllProduct() as Product[];

                const currentDate = new Date();
                const orders: Order[] = cartResponse.map((cart: Order, index: number) => {
                    const products: CartItem[] = cart.products.map((product) => {
                        const matchingProduct = productResponse.find((p: Product) => p.id === product.id);
                        if (!matchingProduct) {
                            console.warn(`Product with ID ${product.id} not found`);
                            return null;
                        }
                        return {
                            id: matchingProduct.id,
                            title: matchingProduct.title,
                            price: matchingProduct.price,
                            quantity: product.quantity,
                            total: product.total,
                            discountPercentage: matchingProduct.discountPercentage,
                            discountedPrice: product.discountedPrice,
                            thumbnail: matchingProduct.thumbnail,
                        };
                    }).filter(item => item !== null) as CartItem[];

                    const purchaseDate = new Date(
                        currentDate.getTime() - (cartResponse.length - index) * 24 * 60 * 60 * 1000
                    );

                    return {
                        ...cart,
                        products,
                        purchaseDate: purchaseDate.toISOString(),
                    };
                });

                setPreviousOrders(orders.reverse()); // Reverse the order to display the most recent first
            } catch (error) {
                console.error('Error fetching previous orders:', error);
            }
        };

        fetchPreviousOrders();
    }, []);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const formatCurrency = (value?: number) => {
        return value !== undefined ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A';
    };


    return (
        <Card className="mb-3 previous-orders-card">
            <Card.Header className="previous-orders-header">Previous Orders</Card.Header>
            <ListGroup variant="flush" className="previous-orders-list">
                {previousOrders.slice(0, showAll ? previousOrders.length : 3).map((order) => (
                    <ListGroup.Item key={order.id} className="previous-orders-item">
                        <div className="order-details mb-3 d-flex flex-row gap-3">
                            <div className="order-detail">
                                <strong>Order ID:</strong> {order.id},
                            </div>
                            <div className="order-detail">
                                <strong>Total:</strong> {formatCurrency(order.total)},
                            </div>
                            <div className="order-detail">
                                <strong>Discounted Total:</strong> {formatCurrency(order.discountedTotal)},
                            </div>
                            <div className="order-detail">
                                <strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="order-products">
                            <strong>Products:</strong>
                            <ul>
                                {order.products.map((product) => (
                                    <li key={product.id} className="product-item">
                                        {product.title} (Quantity: {product.quantity}, Price: {formatCurrency(product.price)})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Card.Body className="previous-orders-footer d-flex justify-content-start p-4">
                <Button variant="primary" onClick={toggleShowAll} className="toggle-btn d-flex align-items-center justify-content-center">
                    {showAll ? (
                        <span>
                            <i className="fa-solid fa-minus me-3"></i> See Less
                        </span>
                    ) : (
                        <span>
                            <i className="fa-solid fa-plus me-3"></i> See More ({previousOrders.length - 3}+)
                        </span>
                    )}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PreviousOrders;
