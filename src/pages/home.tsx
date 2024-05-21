import "../styles/pages/home.css";

const LandingSection = () => {
    return (
        <div className="landing-section">
            <div className="landing-section__background-image">
                <img src="https://png.pngtree.com/background/20230614/original/pngtree-many-people-in-a-crowded-shopping-mall-picture-image_3520865.jpg" alt="Background" />
            </div>
            <div className="landing-section__content">
                <h1 className="landing-section__header">Welcome to Our Store</h1>
                <p className="landing-section__sub-text">Find the best products here</p>
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
