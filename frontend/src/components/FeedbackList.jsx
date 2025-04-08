import React from 'react';

export default function FeedbackList({ entries, onFilter, currentFilter }) {
    return (
        <div>
            <h2>Recent Feedback</h2>

            <div>
                <label>Filter by rating: </label>
                {[1, 2, 3, 4, 5].map((val) => (
                    <button
                        key={val}
                        onClick={() => onFilter(val)}
                        style={{
                            margin: '0 3px',
                            fontWeight: currentFilter === val ? 'bold' : 'normal',
                        }}
                    >
                        {val}
                    </button>
                ))}
                <button onClick={() => onFilter(null)}>Clear</button>
            </div>

            <table border="1" cellPadding="6">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Message</th>
                    <th>Rating</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {entries.map((f) => (
                    <tr key={f.id}>
                        <td>{f.customer_name}</td>
                        <td>{f.message}</td>
                        <td>{f.rating}</td>
                        <td>{new Date(f.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}