import BookCard from "./BookCard";

export default function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-10">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))
      ) : (
        <p className="text-center col-span-full text-on-surface-variant">
          No books found 😢
        </p>
      )}
    </div>
  );
}