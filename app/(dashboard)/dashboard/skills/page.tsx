"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Skill {
  id: number
  name: string
  level: number
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "JavaScript", level: 80 },
    { id: 2, name: "React", level: 75 },
  ])
  const [newSkill, setNewSkill] = useState({ name: "", level: 0 })
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const addSkill = () => {
    setSkills([...skills, { ...newSkill, id: Date.now() }])
    setNewSkill({ name: "", level: 0 })
  }

  const updateSkill = () => {
    if (editingSkill) {
      setSkills(skills.map((s) => (s.id === editingSkill.id ? editingSkill : s)))
      setEditingSkill(null)
    }
  }

  const deleteSkill = (id: number) => {
    setSkills(skills.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Skill</h2>
        <div className="space-y-4">
          <input
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <input
            className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            placeholder="Skill Level (0-100)"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 flex items-center"
            onClick={addSkill}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Skills</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
              <p className="text-gray-600 mb-4">Level: {skill.level}%</p>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
                  onClick={() => setEditingSkill(skill)}
                >
                  <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md transition duration-150 flex items-center"
                  onClick={() => deleteSkill(skill.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingSkill && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Edit Skill</h2>
            <div className="space-y-4">
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              />
              <input
                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="number"
                value={editingSkill.level}
                onChange={(e) => setEditingSkill({ ...editingSkill, level: Number.parseInt(e.target.value) })}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition duration-150"
                  onClick={() => setEditingSkill(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                  onClick={updateSkill}
                >
                  Update Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

