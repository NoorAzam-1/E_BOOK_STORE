import Image from "next/image";

export default function BookCard({ title, author, price, image }) {
  return (
    <article className="group flex flex-col cursor-pointer">
      <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4">
        <Image
          alt="bookImage"
          src={image}
          height={600}
          width={300}
          className="w-full h-full object-cover"
        />

        {/* Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-0 group-hover:opacity-100 flex items-end p-6">
          <button className="w-full py-3 bg-linear-to-r from-primary to-primary-container text-on-primary text-xs uppercase rounded cursor-pointer">
            Quick Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-headline text-lg group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant">{author}</p>
        <p className="text-primary font-bold mt-2">₹{price.toFixed(0)}</p>
      </div>
    </article>
  );
}
