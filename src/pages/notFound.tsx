import { Link } from "react-router-dom";
import "../styles/pages/notfound.css";

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
        <section className="error-area error-one h-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-7 col-xl-8 col-lg-8">
                        <div className="error-content text-center">
                            <span className={`error`}>{statusCode}</span>
                            <h5 className="sub-title">{statusMessage}</h5>
                            <p className="text">
                                {message}
                            </p>
                            <div className="error-form">
                                <Link to="/">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Don't usually do this !!!

export default NotFound