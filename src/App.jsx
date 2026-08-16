import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import StatsDashboard from './components/StatsDashboard';
import FilterBar from './components/FilterBar';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const INITIAL_TODOS = [
  {
    id: '1',
    title: 'Deploy React Todo Monolith to GitHub Pages',
    description: 'Verify CI/CD workflow passes and static bundle is published to gh-pages branch.',
    priority: 'High',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    subtasks: [
      { id: '101', text: 'Configure Vite build.outDir to build', completed: true },
      { id: '102', text: 'Run local build check', completed: true },
      { id: '103', text: 'Push to GitHub main branch', completed: false },
    ]
  },
  {
    id: '2',
    title: 'Design Dark Mode Glassmorphism Theme',
    description: 'Implement sleek CSS custom properties, backdrop blur filters, and vibrant accent gradients.',
    priority: 'High',
    category: 'Work',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    subtasks: []
  },
  {
    id: '3',
    title: 'Weekly Grocery Shopping & Meal Prep',
    description: 'Buy organic greens, almond milk, proteins, and fresh fruit.',
    priority: 'Medium',
    category: 'Shopping',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    subtasks: [
      { id: '301', text: 'Avocados & Spinach', completed: false },
      { id: '302', text: 'Protein powder', completed: true }
    ]
  },
  {
    id: '4',
    title: 'Evening 5K Run & Core Workout',
    description: 'Maintain daily physical fitness streak at the local park.',
    priority: 'Low',
    category: 'Fitness',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    createdAt: new Date(Date.now() - 28800000).toISOString(),
    subtasks: []
  }
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('react_todo_theme') || 'dark';
  });

  // Todos state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('react_todo_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved todos:', e);
      }
    }
    return INITIAL_TODOS;
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('react_todo_theme', theme);
  }, [theme]);

  // Sync todos to localStorage
  useEffect(() => {
    localStorage.setItem('react_todo_items', JSON.stringify(todos));
  }, [todos]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Todo Handlers
  const handleAddTodo = (newTodoData) => {
    const newTodo = {
      id: Date.now().toString(),
      ...newTodoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id, updatedFields) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    ));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const handleCompleteAll = () => {
    setTodos(todos.map(t => ({ ...t, completed: true })));
  };

  const handleExportTodos = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `todo_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportTodos = (importedTodos) => {
    setTodos(importedTodos);
  };

  // Filter & Sort Logic
  const filteredTodos = todos.filter(todo => {
    // Search query
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (todo.subtasks && todo.subtasks.some(st => st.text.toLowerCase().includes(searchQuery.toLowerCase())));

    // Status
    const matchesStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? !todo.completed :
      todo.completed;

    // Category
    const matchesCategory =
      categoryFilter === 'All' ? true : todo.category === categoryFilter;

    // Priority
    const matchesPriority =
      priorityFilter === 'All' ? true : todo.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    // Default: createdAt descending
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="header-bar">
        <div className="brand-title">
          <div className="brand-logo">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="brand-name">React Todo UI</h1>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
              Monolith Suite
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} style={{ color: '#f59e0b' }} /> : <Moon size={20} style={{ color: '#6366f1' }} />}
        </button>
      </header>

      {/* Main Layout */}
      <main>
        {/* Statistics Dashboard */}
        <StatsDashboard
          todos={todos}
          onClearCompleted={handleClearCompleted}
          onCompleteAll={handleCompleteAll}
          onExportTodos={handleExportTodos}
          onImportTodos={handleImportTodos}
        />

        <div className="grid-monolith">
          {/* Left Column: Form & Info */}
          <div>
            <TodoForm onAddTodo={handleAddTodo} />

            {/* Quick tips card */}
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={16} style={{ color: 'var(--accent-primary)' }} /> Monolith Capabilities
              </h4>
              <ul style={{ fontSize: '0.82rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Filter by status, category tags, or priority</li>
                <li>Add subtasks with real-time completion tracking</li>
                <li>Automatic LocalStorage state persistence</li>
                <li>Confetti celebrations upon task completion</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Search, Filter, and Todo Items */}
          <div>
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Todo List Container */}
            <div>
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                  />
                ))
              ) : (
                /* Empty state */
                <div
                  className="glass-card"
                  style={{
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ background: 'var(--bg-glass)', padding: '1rem', borderRadius: '50%', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem' }}>No tasks found</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '320px' }}>
                    {searchQuery || statusFilter !== 'all' || categoryFilter !== 'All' || priorityFilter !== 'All'
                      ? 'Try adjusting your search queries or active filters above.'
                      : 'You are all caught up! Create a new task using the form on the left.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <p>ReactTodoUIMonolith • Ready for GitHub Actions CI/CD Deployment</p>
      </footer>
    </div>
  );
}
