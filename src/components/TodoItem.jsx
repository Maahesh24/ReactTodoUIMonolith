import React, { useState } from 'react';
import { Check, Trash2, Edit2, Calendar, CheckSquare, Square, Save, X, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TodoItem({ todo, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleToggle = () => {
    if (!todo.completed) {
      triggerConfetti();
    }
    onToggleComplete(todo.id);
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = todo.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdate(todo.id, { subtasks: updatedSubtasks });
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory,
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  // Due date helper
  const renderDueDateBadge = () => {
    if (!todo.dueDate) return null;
    const today = new Date().toISOString().split('T')[0];
    const isOverdue = !todo.completed && todo.dueDate < today;
    const isToday = todo.dueDate === today;

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.75rem',
          color: isOverdue ? '#ef4444' : isToday ? '#f59e0b' : 'var(--text-muted)',
          fontWeight: isOverdue || isToday ? 600 : 400,
        }}
      >
        {isOverdue ? <AlertTriangle size={13} /> : <Calendar size={13} />}
        {isOverdue ? `Overdue (${todo.dueDate})` : isToday ? 'Due Today' : todo.dueDate}
      </span>
    );
  };

  // Subtask progress
  const completedSubtasks = todo.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = todo.subtasks?.length || 0;

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        padding: '1.25rem',
        marginBottom: '0.85rem',
        borderLeft: `4px solid ${
          todo.priority === 'High' ? 'var(--priority-high)' :
          todo.priority === 'Medium' ? 'var(--priority-medium)' : 'var(--priority-low)'
        }`,
        opacity: todo.completed ? 0.75 : 1,
        transition: 'all 0.2s ease',
      }}
    >
      {isEditing ? (
        /* Edit View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="text"
            className="input-field"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="textarea-field"
            rows="2"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Edit description..."
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <select className="select-field" value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
            <select className="select-field" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
            </select>
            <input
              type="date"
              className="input-field"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsEditing(false)} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSaveEdit} className="btn-primary" style={{ padding: '0.4rem 0.9rem' }}>
              <Save size={14} /> Save
            </button>
          </div>
        </div>
      ) : (
        /* Normal View */
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
            {/* Checkbox and Title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1 }}>
              <div
                onClick={handleToggle}
                className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
                style={{ marginTop: '0.2rem' }}
              >
                {todo.completed && <Check size={14} strokeWidth={3} />}
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'var(--text-muted)' : 'var(--text-main)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {todo.title}
                </h4>

                {todo.description && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                    {todo.description}
                  </p>
                )}

                {/* Badges row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <span className={`badge badge-${todo.priority.toLowerCase()}`}>
                    {todo.priority}
                  </span>
                  <span className={`badge badge-${todo.category.toLowerCase()}`}>
                    {todo.category}
                  </span>
                  {renderDueDateBadge()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.35rem', opacity: 0.85 }}>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary"
                style={{ padding: '0.4rem', border: 'none', background: 'transparent' }}
                title="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="btn-secondary"
                style={{ padding: '0.4rem', border: 'none', background: 'transparent', color: '#ef4444' }}
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Subtasks Section */}
          {totalSubtasks > 0 && (
            <div style={{ marginTop: '0.85rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Subtasks ({completedSubtasks}/{totalSubtasks})</span>
                <span>{Math.round((completedSubtasks / totalSubtasks) * 100)}%</span>
              </div>
              
              {/* Mini progress bar */}
              <div style={{ width: '100%', height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden', marginBottom: '0.6rem' }}>
                <div
                  style={{
                    width: `${(completedSubtasks / totalSubtasks) * 100}%`,
                    height: '100%',
                    background: 'var(--gradient-main)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              {/* Subtask items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {todo.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    onClick={() => handleToggleSubtask(subtask.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.84rem',
                      color: subtask.completed ? 'var(--text-muted)' : 'var(--text-main)',
                      textDecoration: subtask.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                      padding: '0.2rem 0'
                    }}
                  >
                    {subtask.completed ? (
                      <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
                    ) : (
                      <Square size={15} style={{ color: 'var(--text-dim)' }} />
                    )}
                    <span>{subtask.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
