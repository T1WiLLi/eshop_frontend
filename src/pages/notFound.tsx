import { Link } from "react-router-dom";

interface StatusMessage {
    number: number;
    message: string;
}

function NotFound({ statusCode = 404, message = "The page you are looking for does not exist." }) {

    const statusMessages: StatusMessage[] = [
        { number: 400, message: 'Bad Request' },
        { number: 401, message: 'Unauthorized' },
        { number: 403, message: 'Forbidden' },
        { number: 404, message: 'Not Found' },
        { number: 500, message: 'Internal Server Error' },
    ];

    const statusMessage = statusMessages.find(msg => msg.number === statusCode)?.message || message;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>{`${statusCode} - ${statusMessage}`}</h1>
            <p style={styles.message}>{message}</p>
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