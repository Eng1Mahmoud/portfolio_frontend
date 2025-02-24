"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "Project 1", description: "Description 1" },
    { id: 2, title: "Project 2", description: "Description 2" },
  ])
  const [newProject, setNewProject] = useState({ title: "", description: "" })
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const addProject = () => {
    setProjects([...projects, { ...newProject, id: Date.now() }])
    setNewProject({ title: "", description: "" })
  }

  const updateProject = () => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)))
      setEditingProject(null)
    }
  }

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Project</h2>
        <div className="space-y-4">
          <input
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <textarea
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={4}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 flex items-center"
            onClick={addProject}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
                  onClick={() => setEditingProject(project)}
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <div className="space-y-4">
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              />
              <textarea
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-150"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                  onClick={updateProject}
                >
                  Update Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

