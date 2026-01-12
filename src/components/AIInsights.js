import React from 'react';

const AIInsights = ({ aiData }) => {
  if (!aiData) return null;

  return (
    <div className="ai-box">
      <h3>✨ AI Librarian Insights</h3>
      <p className="intent"><strong>Goal:</strong> {aiData.intent}</p>
      <div className="suggestions">
        <strong>Next Steps:</strong> 
        {aiData.suggestions?.map((topic, index) => (
          <span key={index} className="tag">{topic}</span>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;