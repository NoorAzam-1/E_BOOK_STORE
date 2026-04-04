import BookCard from "./BookCard";
// frontend\src\components\browse\BookGrid.jsx

export default function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
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