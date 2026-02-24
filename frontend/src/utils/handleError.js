export default function handleError(error, setError, message = 'Something went wrong.') {
    console.error('=== API ERROR ===');
    console.error('Message:', error.message);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    setError(message);
}
