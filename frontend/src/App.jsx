import React, { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { fetchFeedback } from './api';

export default function App() {
  const [feedback, setFeedback] = useState([]);
  const [filter, setFilter] = useState(null);

  const loadFeedback = async () => {
    const res = await fetchFeedback(filter);
    setFeedback(res.data);
  };

  useEffect(() => {
    loadFeedback();
  }, [filter]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <FeedbackForm onFeedbackAdded={loadFeedback} />
      <FeedbackList
        entries={feedback}
        onFilter={setFilter}
        currentFilter={filter}
      />
    </div>
  );
}
