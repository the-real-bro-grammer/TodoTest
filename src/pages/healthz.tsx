import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Healthz: NextPage = () => {
    const [healthStatus, setHealthStatus] = useState<string>('');

    useEffect(() => {
        // Perform health check or API call to determine the health status
        const checkHealth = async () => {
            try {
                const response = await fetch('/api/healthz');
                const data = await response.json();
                setHealthStatus(data.status);
            } catch (error) {
                setHealthStatus('Error');
            }
        };

        checkHealth();
    }, []);

    return (
        <div>
            <h1>Health Check</h1>
            <p>Status: {healthStatus}</p>
        </div>
    );
};

export default Healthz;
