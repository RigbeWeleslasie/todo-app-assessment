export default function handleError(error, setError, defaultMessage = 'Something went wrong.') {
    let errorMessage = defaultMessage;

    if (error.response) {
        if (error.response.data) {
            if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error;
            } else {
                errorMessage = `Server error: ${error.response.status}`;
            }
        }
    } else if (error.request) {
        errorMessage = error.message || 'No response received from server';
    } else {
        errorMessage = error.message || defaultMessage;
    }

    if (setError) setError(errorMessage);

    return errorMessage;
}