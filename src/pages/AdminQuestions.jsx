import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // just taking the first 100 for now if there are many
          setQuestions(data.questions.slice(0, 100));
        } else {
          setError("Failed to load questions");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Error fetching questions");
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Link to="/admin/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '600', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ color: '#0B2447', fontSize: '32px', margin: 0 }}>Questions Database</h1>
          <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>Manage all questions in the system.</p>
        </div>
      </header>

      {loading ? (
        <div>Loading questions...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '13px', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>ID</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Question</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>{q.id}</td>
                  <td style={{ padding: '16px', color: '#0B2447', fontWeight: '600', fontSize: '14px' }}>{q.subject_name || q.subject}</td>
                  <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {q.question_text ? q.question_text.replace(/<[^>]+>/g, '') : ''}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: q.is_active ? '#3b82f6' : '#93c5fd', color: q.is_active ? '#166534' : '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                      {q.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button onClick={() => alert('Delete endpoint not yet implemented')} style={{background: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer'}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '16px', color: '#64748b', fontSize: '13px', textAlign: 'center' }}>
            Showing {questions.length} questions
          </div>
        </div>
      )}
    </main>
  );
}
