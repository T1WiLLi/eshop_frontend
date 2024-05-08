import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 - Not Found</h1>
            <p style={styles.message}>The page you are looking for does not exist.</p>
            <Link to="/" style={styles.link}>Go to Home</Link>
        </div>
    );
}

// Don't usually do this !!!

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px',
        display: 'block'
    },
    heading: {
        fontSize: '48px',
        marginBottom: '20px'
    },
    message: {
        fontSize: '18px',
        marginBottom: '20px'
    },
    link: {
        fontSize: '18px',
        color: 'blue',
        textDecoration: 'underline'
    }
};



export default NotFound