export default function StarRating({ rating = 0 }) {
  const full = Math.round(rating);
  return (
    <span className="stars">
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
    </span>
  );
}
