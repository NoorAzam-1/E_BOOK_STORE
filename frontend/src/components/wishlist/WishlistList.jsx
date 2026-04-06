"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, deleteWishlist } from "@/features/wishlistSlice";
import WishlistItem from "./WishlistItem";

export default function WishlistList() {
  const dispatch = useDispatch();
  const { wishlist = [], loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (wishlist.length === 0) {
    return <p className="text-center">No items in wishlist</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {wishlist.map((item) => (
        <WishlistItem
          key={item._id}
          id={item._id}
          title={item.bookId?.title}
          author={item.bookId?.author}
          price={item.bookId?.price}
          image={item.bookId?.images?.[0]?.url}
          onDelete={() => dispatch(deleteWishlist(item._id))}
        />
      ))}
    </div>
  );
}
