import BookCard from "./BookCard";

export default function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
      {books.length > 0 ? (
        books.map((book, i) => (
          <BookCard key={i} {...book} />
        ))
      ) : (
        <p className="text-center col-span-full text-on-surface-variant">
          No books found 😢
        </p>
      )}
    </div>
  );
}