/**
 * The AuthResponse interface defines the structure of the response returned by an authentication API.
 * It contains information about the authentication attempt, including the token, response message,
 * and success status.
 */
export interface AuthResponse {
    /**
     * This property holds the authentication token if the authentication attempt is successful.
     * If the attempt fails, this property will be null.
     * 
     * @type {string | null}
     */
    token: string | null;

    /**
     * This property contains a response message from the authentication process. It can provide
     * additional information about the authentication result, such as an error message if the attempt
     * fails. This property will be null if there is no message to convey.
     * 
     * @type {string | null}
     */
    response: string | null;

    /**
     * This property indicates whether the authentication attempt was successful. It will be true if
     * the authentication was successful and false otherwise.
     * 
     * @type {boolean}
     */
    success: boolean;
}