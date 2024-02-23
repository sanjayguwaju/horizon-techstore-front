import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1);
        }, 1000);

        // Redirect once count is equal to 0
        if (count === 0) {
            clearInterval(interval); // Clear interval to stop the countdown
            navigate("/");
        }

        // Clean up function to clear interval on component unmount
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <div className="container p-5 text-center">
            <p>Redirecting in {count} seconds...</p>
        </div>
    );
};

export default LoadingToRedirect;
