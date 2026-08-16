import React, { useState } from 'react';
import { Plus, Tag, Flag, Calendar, ListPlus, AlignLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { id: Date.now().toString(), text: newSubtask.trim(), completed: false }]);
    setNewSubtask('');
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
      subtasks,
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('Work');
    setDueDate('');
    setSubtasks([]);
    setNewSubtask('');
    setIsExpanded(false);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} style={{ color: 'var(--accent-primary)' }} /> Create New Task
        </h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-secondary"
          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {isExpanded ? 'Simple Mode' : 'Detailed Mode'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title row */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type="text"
            className="input-field"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="btn-primary" style={{ flexShrink: 0 }}>
            <Plus size={18} /> Add Task
          </button>
        </div>

        {/* Expanded Form Options */}
        {isExpanded && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            
            {/* Priority & Category & Due Date Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <Flag size={14} /> Priority
                </label>
                <select className="select-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="High">🔴 High</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Low">🟢 Low</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <Tag size={14} /> Category
                </label>
                <select className="select-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Health">Health</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  <Calendar size={14} /> Due Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            {/* Description Notes */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <AlignLeft size={14} /> Description / Notes
              </label>
              <textarea
                className="textarea-field"
                rows="2"
                placeholder="Add additional details or context..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Subtasks Builder */}
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <ListPlus size={14} /> Subtasks Checklist
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  className="input-field"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                  placeholder="Add a step or subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(e); } }}
                />
                <button type="button" onClick={handleAddSubtask} className="btn-secondary" style={{ padding: '0.5rem 0.85rem' }}>
                  Add Step
                </button>
              </div>

              {subtasks.length > 0 && (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {subtasks.map((st) => (
                    <li key={st.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <span>• {st.text}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(st.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}
      </form>
    </div>
  );
}
