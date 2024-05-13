import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, PieController, ArcElement, Legend, Tooltip } from 'chart.js';

ChartJS.register(PieController, ArcElement, Legend, Tooltip);

const SpendingChart = ({ refreshTrigger }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchSpendingData = async () => {
            setLoading(true);
            setError('');
            const token = sessionStorage.getItem('token');
            if (!token) {
                setError('You are not logged in. Please log in to view this data.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/spending/byCategory', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
                }

                const data = await response.json();
                setChartData({
                    labels: data.map(d => d.category),
                    datasets: [{
                        data: data.map(d => d.amount),
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 159, 64)'
                        ],
                        hoverOffset: 4
                    }]
                });
            } catch (error) {
                setError('Error fetching spending data: ' + error.message);
            }
            setLoading(false);
        };

        fetchSpendingData();
    }, [refreshTrigger]);

    useEffect(() => {
        if (chartRef.current && chartData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const context = chartRef.current.getContext('2d');
            chartInstance.current = new ChartJS(context, {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {}
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [chartData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div style={{ width: '500px', height: '500px', marginTop: '100px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default SpendingChart;
