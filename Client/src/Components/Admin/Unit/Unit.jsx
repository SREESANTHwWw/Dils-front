import React from 'react';
import { PlusCircle } from "lucide-react";

const Unit = () => {

    
  return (
    <div className="h-full bg-gray-100 shadow-md p-6 rounded-lg">
     <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Unit</h2>
        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          // onClick={addCategory}
        >
          <PlusCircle size={18} />
          Add Unit
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left border border-gray-300">Sl No</th>
              <th className="py-3 px-6 text-left border border-gray-300">Unit Name</th>
              <th className="py-3 px-6 text-center border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {[
              { id: 1, name: 'KG' },
              { id: 2, name: 'Gram' },
              { id: 3, name: 'Litre' },
              { id: 4, name: 'Dozen' },
            ].map((unit) => (
              <tr
                key={unit.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border border-gray-300">
                  {unit.id}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {unit.name}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition-all duration-200">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Unit;
 