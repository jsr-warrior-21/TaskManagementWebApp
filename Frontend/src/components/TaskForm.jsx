import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, formData, {
        headers: { 'x-auth-token': token }
      });
      onTaskAdded(res.data);
      setFormData({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Create new task</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            className="input-primary"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            rows="3"
            className="input-primary resize-none"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading} className="btn-primary w-auto px-6 bg-indigo-600 hover:bg-indigo-700">
            {loading ? 'Creating...' : 'Add task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;