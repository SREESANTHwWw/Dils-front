// import { Pencil, Trash2, LayersIcon } from 'lucide-react';

// const Category = {
//   id: "number",
//   name: "string",
//   image: "string",
// }

// const categories = [
//   {
//     id: 1,
//     name: 'Chain Saw',
//     image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=100&h=100',
//   },
//   {
//     id: 2,
//     name: 'Brush Cutter',
//     image: 'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?auto=format&fit=crop&q=80&w=100&h=100',
//   },
// ];

// export default function CategoryTable() {
//   return (
//     <div className="bg-white rounded-lg shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="py-4 px-6 text-left">SI No</th>
//               <th className="py-4 px-6 text-left">Category Name</th>
//               <th className="py-4 px-6 text-left">Image</th>
//               <th className="py-4 px-6 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category) => (
//               <tr key={category.id} className="border-b hover:bg-gray-50">
//                 <td className="py-4 px-6">{category.id}</td>
//                 <td className="py-4 px-6">{category.name}</td>
//                 <td className="py-4 px-6">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-12 h-12 rounded-lg object-cover"
//                   />
//                 </td>
//                 <td className="py-4 px-6">
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1.5 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center gap-1">
//                       <Trash2 size={16} />
//                       Delete
//                     </button>
//                     <button className="px-3 py-1.5 text-white bg-yellow-500 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1">
//                       <Pencil size={16} />
//                       Edit
//                     </button>
//                     <button className="px-3 py-1.5 text-white bg-gray-600 rounded hover:bg-gray-700 transition-colors flex items-center gap-1">
//                       <LayersIcon size={16} />
//                       Manage Sub Category
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }