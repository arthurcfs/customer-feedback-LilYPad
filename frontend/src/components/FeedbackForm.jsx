import React, { useState } from 'react';
import { submitFeedback } from '../api';

const emojiMap = {
    1: '😕',
    2: '😐',
    3: '🙂',
    4: '😃',
    5: '🤩',
};

export default function FeedbackForm({ onFeedbackAdded }) {
    const [form, setForm] = useState({
        customer_name: '',
        message: '',
        rating: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEmojiClick = (value) => {
        setForm({ ...form, rating: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        try {
            await submitFeedback(form);
            onFeedbackAdded();
            setForm({ customer_name: '', message: '', rating: '' });
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2>Leave Feedback</h2>

            <div>
                <label>Name</label><br/>
                <input
                    type="text"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                />
                {errors.customer_name && <small>{errors.customer_name[0]}</small>}
            </div>

            <div>
                <label>Message</label><br/>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />
                {errors.message && <small>{errors.message[0]}</small>}
            </div>

            <div>
                <label>How happy are you with this app?</label><br/>
                <div>
                    {Object.entries(emojiMap).map(([val, emoji]) => (
                        <button
                            key={val}
                            type="button"
                            onClick={() => handleEmojiClick(val)}
                            style={{
                                fontSize: '1.5rem',
                                margin: '0 5px',
                                background: form.rating === val ? '#d1fae5' : 'transparent',
                            }}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
                {errors.rating && <small>{errors.rating[0]}</small>}
            </div>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Submit Feedback'}
            </button>
        </form>
    );
}