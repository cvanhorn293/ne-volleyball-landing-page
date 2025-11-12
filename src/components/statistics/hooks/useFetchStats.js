import { useState, useEffect } from 'react';

export function useFetchStats(teamId = '604893', perPage = 150) {
    const url = `https://api.wmt.games/api/statistics/teams/${teamId}/players?per_page=${perPage}`;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const result = await response.json();
                setData(result.data || []);
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [teamId, perPage, url]);

    return { data, loading, error };
}
