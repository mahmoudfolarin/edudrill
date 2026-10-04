import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", subject_group: "Science", icon: "📝", exam_slugs: "all" });

  const fetchSubjects = () => {
    setLoading(true);
    fetch("/api/subjects")
      .then(res => res.json())
      .then(data => {
        if (data.success) setSubjects(data.subjects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("/api/subjects", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newSubject,
        exam_slugs: newSubject.exam_slugs === "all" ? "all" : [newSubject.exam_slugs]
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setShowModal(false);
        setNewSubject({ name: "", subject_group: "Science", icon: "📝", exam_slugs: "all" });
        fetchSubjects();
      } else {
        alert(data.message || "Error adding subject");
      }
    })
    .catch(err => alert("Error: " + err.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this subject? It will be removed from all exams.")) return;
    
    fetch(`/api/subjects/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchSubjects();
        else alert(data.message || "Error deleting subject");
      })
      .catch(err => alert("Error: " + err.message));
  };

  return (
    <main style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Link to="/admin/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '600', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ color: '#0B2447', fontSize: '32px', margin: 0 }}>Exams & Subjects</h1>
          <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>Control examinations, subjects, courses and availability.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ background: '#0ea5e9', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>+ Add Subject</button>
      </header>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginTop: 0, color: '#0B2447' }}>Add New Subject</h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B2447' }}>Subject Name</label>
                <input required type="text" value={newSubject.name} onChange={e => setNewSubject({...newSubject, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B2447' }}>Subject Group</label>
                <select value={newSubject.subject_group} onChange={e => setNewSubject({...newSubject, subject_group: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="Core Subjects">Core Subjects</option>
                  <option value="Science">Science</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Business">Business</option>
                  <option value="Trade / Vocational">Trade / Vocational</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B2447' }}>Exams (Assign To)</label>
                <select value={newSubject.exam_slugs} onChange={e => setNewSubject({...newSubject, exam_slugs: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <option value="all">All Exams</option>
                  <option value="waec">WAEC</option>
                  <option value="jamb">JAMB</option>
                  <option value="neco">NECO</option>
                </select>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0B2447' }}>Icon</label>
                <input required type="text" value={newSubject.icon} onChange={e => setNewSubject({...newSubject, icon: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. 📝" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#0ea5e9', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Add Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div>Loading subjects...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {subjects.map(sub => (
            <div key={sub.id} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#0B2447' }}>{sub.name}</h3>
                <span style={{ fontSize: '20px' }}>{sub.icon}</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px 0' }}>Group: {sub.subject_group}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: sub.is_active ? '#3b82f6' : '#93c5fd', color: sub.is_active ? '#1e3a8a' : '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                  {sub.is_active ? 'Active' : 'Inactive'}
                </span>
                <button onClick={() => handleDelete(sub.id)} style={{ background: '#93c5fd', color: '#1e40af', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
