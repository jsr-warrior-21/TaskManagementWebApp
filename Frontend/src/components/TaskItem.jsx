import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: task.title, description: task.description });
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/tasks/${task._id}/toggle`, {}, {
        headers: { 'x-auth-token': token }
      });
      onTaskUpdated(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
          headers: { 'x-auth-token': token }
        });
        onTaskDeleted(task._id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editData.title.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, editData, {
        headers: { 'x-auth-token': token }
      });
      onTaskUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="input-primary"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="input-primary resize-none"
            rows="2"
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium transition-all">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 text-sm font-medium transition-all">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className={`font-semibold text-gray-900 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              task.status === 'completed' 
                ? 'bg-green-50 text-green-700' 
                : 'bg-yellow-50 text-yellow-700'
            }`}>
              {task.status}
            </span>
          </div>
          {task.description && (
            <p className={`text-gray-500 text-sm mt-1.5 ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleStatus}
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 font-medium transition-all"
          >
            {task.status === 'pending' ? 'Complete' : 'Undo'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 font-medium transition-all"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-xl hover:bg-red-100 font-medium transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;