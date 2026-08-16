import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ListTodo, Flame, Trash2, CheckCheck } from 'lucide-react';

export default function StatsDashboard({ todos, onClearCompleted, onCompleteAll }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  
  const today = new Date().toISOString().split('T')[0];
  const overdue = todos.filter(t => !t.completed && t.dueDate && t.dueDate < today).length;
  
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG progress ring math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Flame size={20} style={{ color: '#f59e0b' }} /> Performance Dashboard
        </h3>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={onCompleteAll} 
            disabled={pending === 0}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', opacity: pending === 0 ? 0.5 : 1 }}
            title="Mark all active tasks as complete"
          >
            <CheckCheck size={14} /> Complete All
          </button>

          <button 
            onClick={onClearCompleted} 
            disabled={completed === 0}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', color: '#ef4444', opacity: completed === 0 ? 0.5 : 1 }}
            title="Delete all finished tasks"
          >
            <Trash2 size={14} /> Clear Done
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        {/* Visual Ring */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-glass)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
            <svg width="80" height="80" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="45" cy="45" r={radius}
                stroke="var(--border-color)"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="45" cy="45" r={radius}
                stroke="url(#gradient-ring)"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              <defs>
                <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{percentage}%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Progress</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{completed}/{total} Tasks</div>
          </div>
        </div>

        {/* Counter Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-glass)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1', padding: '0.6rem', borderRadius: '8px' }}>
            <ListTodo size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Tasks</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{total}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-glass)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.6rem', borderRadius: '8px' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>{completed}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-glass)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.6rem', borderRadius: '8px' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b' }}>{pending}</div>
          </div>
        </div>

        {overdue > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.6rem', borderRadius: '8px' }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Overdue</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ef4444' }}>{overdue}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
