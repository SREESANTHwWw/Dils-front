import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { server } from "../../../Server";
import { toast } from "react-toastify";

const Unit = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [unitname, setUnitname] = useState("");
  const [unitList, setUnitList] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [unitid, setUnitId] = useState("");

  // Fetch Units
  useEffect(() => {
    axios
      .get(`${server}/getunit`)
      .then((res) => setUnitList(res.data.getUnit))
      .catch((err) => console.error("Error fetching units:", err));
  }, []);

  // Add Unit
  const addUnit = async (e) => {
    e.preventDefault();
    if (!unitname.trim()) {
      toast.error("Unit name cannot be empty.", { theme: "colored" });
      return;
    }
    try {
      const res = await axios.post(`${server}/addunit`, { unitname });
      setUnitList([...unitList, res.data.unitCreate]);
      setUnitname("");
      setModalOpen(false);
      toast.success("Unit added successfully.", { theme: "colored" });
    } catch (error) {
      console.error("Failed to add unit:", error);
      toast.error("An error occurred while adding the unit. Please try again.", { theme: "colored" });
    }
  };

  // Delete Unit
  const deleteUnit = (id) => {
    if (window.confirm("Are you sure you want to delete this unit?")) {
      axios
        .delete(`${server}/deleteUnit/${id}`)
        .then(() => {
          setUnitList((prev) => prev.filter((item) => item._id !== id));
          toast.success("Unit deleted successfully.", { theme: "colored" });
        })
        .catch((err) => {
          console.error("Error deleting unit:", err);
          toast.error("Failed to delete unit.", { theme: "colored" });
        });
    }
  };

  // Open Edit Modal
  const openEditModal = (unit) => {
    setUnitname(unit.unitname);
    setUnitId(unit._id);
    setEditOpen(true);
  };

  // Edit Unit
  const editUnitFun = async (e) => {
    e.preventDefault();
    if (!unitname.trim()) {
      toast.error("Unit name cannot be empty.", { theme: "colored" });
      return;
    }
    try {
      const res = await axios.patch(`${server}/editUnit/${unitid}`, { unitname });
      const updatedUnit = res.data.updatedUnit;
      setUnitList((prev) =>
        prev.map((unit) => (unit._id === updatedUnit._id ? updatedUnit : unit))
      );
      setUnitname("");
      setUnitId("");
      setEditOpen(false);
      toast.success("Unit edited successfully.", { theme: "colored" });
    } catch (error) {
      console.error("Error editing unit:", error);
      toast.error("Failed to edit unit.", { theme: "colored" });
    }
  };

  return (
    <div className="h-full bg-gray-100 shadow-md p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Unit</h2>
        <button
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
          onClick={() => setModalOpen(true)}
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
            {unitList.map((unit, index) => (
              <tr
                key={unit._id}
                className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border border-gray-300">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left border border-gray-300">
                  {unit.unitname}
                </td>
                <td className="py-3 px-6 text-center border border-gray-300">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition-all duration-200"
                    onClick={() => openEditModal(unit)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-200"
                    onClick={() => deleteUnit(unit._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Unit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <form onSubmit={addUnit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Unit Name:</label>
                <input
                  type="text"
                  value={unitname}
                  onChange={(e) => setUnitname(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Unit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <form onSubmit={editUnitFun}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Unit Name:</label>
                <input
                  type="text"
                  value={unitname}
                  onChange={(e) => setUnitname(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unit;
