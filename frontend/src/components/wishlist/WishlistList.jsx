// import WishlistItem from "./WishlistItem";

// const items = [
//   {
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     price: 18.5,
//     tag: "Digital Edition",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCgKswBj9KVthgqpMMWw5vPyySs01pvKvsOjv-tPdFAEH_vnBN4CetgjDYkM2nezkbdGXEOe8L4Zg1RM06W2BvB79DaiMkwKV5zu9JVvuyRrbBiqTlqbZ_veQjlr-6wYzoRKeMYn0RVa5CG53Es3uP0itKM9luXPe-9xlym-9wOYw72EPtaVGYES3jSmaB7t0hEHJl7BnVxvf4TEVbc8Q3cd2EbDtqhZznE1bilPDIA36VVQ0iT2yP2Vh7fL_LXvvW8C1fjW_9Wxzo",
//   },
//   {
//     title: "Echoes of Tomorrow",
//     author: "Clara V. Stern",
//     price: 24.99,
//     tag: "Special Edition",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAaMm6L_lYZCVS4dAUsWCRcyJAvj82CHLCKx9PwimG1dOk2-P7SfA5o_AZXT6-AmyqHNMIU3w_Hy616Ah3wP-UX7g4RlN1s4QZNslPRUBhzQrRTpYmPhhjl8hkQGMTaftFqwGs1q85YXX4Ncro1yN0boEGKY6kOPWf7iv2Gs1SZr99Dnl0MIzOvBmFYfIuluw95TTkJ0N6XSjWRmvfVp1WbkYofA_zVxo0nT-qH183WMQi1CDsGS6diYliWbE-uvBw86MZnTVrp8pg",
//   },
//   {
//     title: "Celestial Navigation",
//     author: "Julian Thorne",
//     price: 12.99,
//     tag: "E-Book Only",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQFxIr88oIr8ZPkuN6kW7k1ZTB7sjJdtTBCg8JHTsK0OoRCArMbUZYkSI9nNvSiz7On9tqB8Cch8lefcsF5hpW5XE0qaw9cRELIAI2xQEF-SIumaitqCgab3pPZu9r6CTig3rE_1KAGqhlMWl21GLxorCMW6ZlrVVnZtkmx6IGt0zxa_pFmfOOaIHgnkA9sHXpy34CIqq05XEjYVgi99RkOo3ZQAoQ4POsaW-cCYg3gv1EZalBvl-fi3UUbOzRgmgeEUFdJn_PIo",
//   },
// ];

// export default function WishlistList() {
//   return (
//     <div className="flex flex-col gap-6 md:gap-8">
//       {items.map((item, i) => (
//         <WishlistItem key={i} {...item} />
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, deleteWishlist } from "@/features/wishlistSlice";
import WishlistItem from "./WishlistItem";

export default function WishlistList() {
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  //  Loading
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  //  Empty
  if (!wishlist || wishlist.length === 0) {
    return <p className="text-center">No items in wishlist</p>;
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {wishlist.map((item) => (
        <WishlistItem
          key={item._id}
          id={item._id}
          title={item.title}
          author={item.author}
          price={item.price}
          image={item.image}
          onDelete={() => dispatch(deleteWishlist(item._id))}
        />
      ))}
    </div>
  );
}