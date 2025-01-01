import React from 'react'
import AllUsers from './AllUsers'

const user = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add
        </button>
      </div>
      
      <AllUsers />
    </div>
  )
}

export default user