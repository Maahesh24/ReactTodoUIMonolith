import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy
}) {
  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'Fitness'];

  return (
    <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
      {/* Search & Sort Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        {/* Search input */}
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.4rem', paddingRight: searchQuery ? '2.4rem' : '1rem' }}
            placeholder="Search tasks, notes, subtasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Priority Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '0 1 170px' }}>
          <Filter size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <select
            className="select-field"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '0 1 180px' }}>
          <ArrowUpDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <select
            className="select-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort by Date Added</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort Alphabetically</option>
          </select>
        </div>
      </div>

      {/* Tabs & Category Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-primary)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          {['all', 'active', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                border: 'none',
                background: statusFilter === status ? 'var(--accent-primary)' : 'transparent',
                color: statusFilter === status ? '#ffffff' : 'var(--text-muted)',
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: statusFilter === status ? 600 : 400,
                textTransform: 'capitalize',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`badge badge-${cat.toLowerCase()}`}
              style={{
                cursor: 'pointer',
                opacity: categoryFilter === cat ? 1 : 0.45,
                border: categoryFilter === cat ? '1px solid currentColor' : '1px solid transparent',
                padding: '0.35rem 0.7rem',
                fontSize: '0.75rem',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
