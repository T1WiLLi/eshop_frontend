import "../styles/pages/home.css";

const LandingSection = () => {
    return (
        <div className="landing-section">
            <div className="landing-section__background-image">
                <img src="https://t3.ftcdn.net/jpg/04/92/40/50/360_F_492405035_I1WbXZSv1S9zqRBWmjX9lmQK3hiNnAYc.jpg" alt="Background" />
            </div>
            <div className="landing-section__content">
                <h1 className="landing-section__header">Welcome to Our Store</h1>
                <p className="landing-section__sub-text">Find the best products here</p>
                <a href="/shop" className="shop-now-link">
                    <button className="shop-now-button mt-4">Shop Now</button>
                </a>
            </div>
        </div>
    );
}

function Home() {
    return (
        <>
            <LandingSection />
        </>
    )
}

export default Home;
