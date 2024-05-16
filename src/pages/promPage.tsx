import { useEffect, useState } from "react";
import "../styles/pages/prompage.css";
import { Auth } from "../api/auth";
import { Cookie } from "../lib/Cookie";
import { useNavigate } from "react-router-dom";


function promPage() {
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsername = async () => {
            try {
                let user = (await Auth.getInstance().getCurrentUser(Cookie.getToken()));
                setUsername(user.firstName + " " + user.lastName);
            } catch (error: any) {
                console.log(`Error fetching product data: ${error.message}`);
            }
        };
        getUsername();
    }, []);

    const handleNavigate = () => {
        navigate("/checkout");
    }

    return (
        <section className="pricing-area pricing-one">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-7 col-lg-8">
                        <div className="section-title text-center">
                            <h2 className="mb-3 fw-bold">{username}, get access to all the benefits of <strong style={{ color: "#007bff" }}>eShop<span style={{ color: "#0056b3" }}>Qc</span></strong> NOW.</h2>
                            <button onClick={handleNavigate} className="btn btn-primary rounded-pill">No Thanks</button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-7 col-sm-9">
                        <div className="pricing-style-one card-element">
                            <div className="pricing-header text-center">
                                <h5 className="sub-title">Basic</h5>
                                <span className="price">$20</span>
                                <h5 className="year">Per year</h5>
                            </div>
                            <div className="pricing-list">
                                <ul>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Unlimited product listings
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Basic product categorization and filtering
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Simple product variation management (e.g. color, size)
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Standard payment processing fees
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-btn text-center">
                                <a className="btn btn-primary rounded-pill" href="#">
                                    GET STARTED
                                </a>
                            </div>
                            <div className="bottom-shape">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35">
                                    <defs>
                                        <style>
                                            {`
                                                .color-1 {
                                                fill: #2bdbdc;
                                                isolation: isolate;
                                                }
                                                .cls-1 {
                                                opacity: 0.1;
                                                }
                                                .cls-2 {
                                                opacity: 0.2;
                                                }
                                                .cls-3 {
                                                opacity: 0.4;
                                                }
                                                .cls-4 {
                                                opacity: 0.6;
                                                }
                                            `}
                                        </style>
                                    </defs>
                                    <title>bottom-part1</title>
                                    <g>
                                        <g data-name="Group 747">
                                            <path
                                                data-name="Path 294"
                                                className="cls-1 color-1"
                                                d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 297"
                                                className="cls-2 color-1"
                                                d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 296"
                                                className="cls-3 color-1"
                                                d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 295"
                                                className="cls-4 color-1"
                                                d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                transform="translate(0 0)"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-7 col-sm-9">
                        <div className="pricing-style-one card-element">
                            <div className="pricing-header text-center">
                                <h5 className="sub-title">Gold</h5>
                                <span className="price">$75</span>
                                <h5 className="year">Per year</h5>
                            </div>
                            <div className="pricing-list">
                                <ul>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Advanced product categorization and filtering
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Multi-variant product management (e.g. different materials, colors)
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Priority order processing and fulfillment
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Lower payment processing fees
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-btn text-center">
                                <a className="btn btn-primary rounded-pill" href="#">
                                    GET STARTED
                                </a>
                            </div>
                            <div className="bottom-shape">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35">
                                    <defs>
                                        <style>
                                            {`
                                                .color-1 {
                                                fill: #2bdbdc;
                                                isolation: isolate;
                                                }
                                                .cls-1 {
                                                opacity: 0.1;
                                                }
                                                .cls-2 {
                                                opacity: 0.2;
                                                }
                                                .cls-3 {
                                                opacity: 0.4;
                                                }
                                                .cls-4 {
                                                opacity: 0.6;
                                                }
                                            `}
                                        </style>
                                    </defs>
                                    <title>bottom-part1</title>
                                    <g>
                                        <g data-name="Group 747">
                                            <path
                                                data-name="Path 294"
                                                className="cls-1 color-1"
                                                d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 297"
                                                className="cls-2 color-1"
                                                d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 296"
                                                className="cls-3 color-1"
                                                d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 295"
                                                className="cls-4 color-1"
                                                d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                transform="translate(0 0)"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-7 col-sm-9">
                        <div className="pricing-style-one card-element">
                            <div className="pricing-header text-center">
                                <h5 className="sub-title">Premium</h5>
                                <span className="price">$100</span>
                                <h5 className="year">Per year</h5>
                            </div>
                            <div className="pricing-list">
                                <ul>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Dedicated account manager for custom solutions and support
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Customizable product bundling and pricing options
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Real-time product availability and tracking updates
                                    </li>
                                    <li>
                                        <i className="lni lni-checkmark-circle"></i> Wholesale pricing and custom ordering options for businesses
                                    </li>
                                </ul>
                            </div>
                            <div className="pricing-btn text-center">
                                <a className="btn btn-primary rounded-pill" href="#">
                                    GET STARTED
                                </a>
                            </div>
                            <div className="bottom-shape">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 112.35">
                                    <defs>
                                        <style>
                                            {`
                                                .color-1 {
                                                fill: #2bdbdc;
                                                isolation: isolate;
                                                }
                                                .cls-1 {
                                                opacity: 0.1;
                                                }
                                                .cls-2 {
                                                opacity: 0.2;
                                                }
                                                .cls-3 {
                                                opacity: 0.4;
                                                }
                                                .cls-4 {
                                                opacity: 0.6;
                                                }
                                            `}
                                        </style>
                                    </defs>
                                    <title>bottom-part1</title>
                                    <g>
                                        <g data-name="Group 747">
                                            <path
                                                data-name="Path 294"
                                                className="cls-1 color-1"
                                                d="M0,24.21c120-55.74,214.32,2.57,267,0S349.18,7.4,349.18,7.4V82.35H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 297"
                                                className="cls-2 color-1"
                                                d="M350,34.21c-120-55.74-214.32,2.57-267,0S.82,17.4.82,17.4V92.35H350Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 296"
                                                className="cls-3 color-1"
                                                d="M0,44.21c120-55.74,214.32,2.57,267,0S349.18,27.4,349.18,27.4v74.95H0Z"
                                                transform="translate(0 0)"
                                            />
                                            <path
                                                data-name="Path 295"
                                                className="cls-4 color-1"
                                                d="M349.17,54.21c-120-55.74-214.32,2.57-267,0S0,37.4,0,37.4v74.95H349.17Z"
                                                transform="translate(0 0)"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default promPage