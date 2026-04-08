// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   getAllProducts,
//   deleteProduct,
// } from "@/features/productSlice";

// import {
//   getAllFeedback,
//   deleteFeedback,
// } from "@/features/feedbackSlice";

// import {
//   getMyOrders,
//   updateOrderStatus,
// } from "@/features/orderSlice";

// // (assume adminSlice banaya hai)
// import { getAllUsers, deleteUser } from "@/features/adminSlice";

// export default function AdminPage() {
//   const dispatch = useDispatch();

//   const { products } = useSelector((state) => state.product);
//   const { feedbacks } = useSelector((state) => state.feedback);
//   const { orders } = useSelector((state) => state.order);
//   const { users } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(getAllProducts());
//     dispatch(getAllFeedback());
//     dispatch(getMyOrders());
//     dispatch(getAllUsers());
//   }, [dispatch]);

//   return (
//     <div className="p-6 text-on-surface">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold mb-8 text-primary">
//         Admin Dashboard
//       </h1>

//       {/* USERS */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4">Users</h2>

//         <div className="bg-background border rounded-lg">
//           {users?.map((u) => (
//             <div
//               key={u._id}
//               className="flex justify-between p-3 border-b"
//             >
//               <div>
//                 <p>{u.name}</p>
//                 <p className="text-xs text-muted-foreground">
//                   {u.email}
//                 </p>
//               </div>

//               <button
//                 onClick={() => dispatch(deleteUser(u._id))}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* BOOKS */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4">Books</h2>

//         {products.map((p) => (
//           <div key={p._id} className="flex justify-between p-3 border-b">
//             <span>{p.title}</span>

//             <button
//               onClick={() => dispatch(deleteProduct(p._id))}
//               className="text-red-500"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </section>

//       {/* ORDERS */}
//       <section className="mb-12">
//         <h2 className="text-xl font-semibold mb-4">Orders</h2>

//         {orders.map((o) => (
//           <div key={o._id} className="flex justify-between p-3 border-b">
//             <span>{o._id}</span>

//             <select
//               onChange={(e) =>
//                 dispatch(
//                   updateOrderStatus({
//                     id: o._id,
//                     data: { status: e.target.value },
//                   })
//                 )
//               }
//               className="bg-background border px-2 py-1"
//             >
//               <option>pending</option>
//               <option>shipped</option>
//               <option>delivered</option>
//             </select>
//           </div>
//         ))}
//       </section>

//       {/* FEEDBACK */}
//       <section>
//         <h2 className="text-xl font-semibold mb-4">Feedback</h2>

//         {feedbacks.map((f) => (
//           <div key={f._id} className="flex justify-between p-3 border-b">
//             <span>{f.message}</span>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => dispatch(deleteFeedback(f._id))}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }


export default function page(){
  return(
    <div className="p-6 text-on-surface">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Admin Dashboard
      </h1>
      <p>Admin functionalities will be implemented here.</p>
    </div>
  ) 
}