import Image from "next/image";
import Link from "next/link";

export default function WishlistCard({ title, price, image, bg }) {
  return (
    <Link href="/browse" className="min-w-56 md:min-w-60 bg-surface-container-high p-4 rounded-xl flex gap-4">
      <div className={`p-3 rounded-lg`} style={{backgroundColor: bg}}>
        <Image
        alt="images"
        src={image}
        height={200}
        width={120}
        className="w-14 h-20 object-cover rounded"
      />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-on-surface-variant">Author Name</p>
        </div>

        <p className="text-primary font-bold">{price}</p>
      </div>
    </Link>
  );
}
