// Renders a product's image. If `product.image` looks like a file path or
// URL, it's shown as a real <img>; otherwise it's treated as an emoji and
// shown as text on a soft colour tile. This means the project works with
// zero photo assets today, and swapping in real photos later (see README
// section 6) requires no component changes.
export default function ProductTile({ product, emojiOnly = false }) {
  const looksLikeUrl = typeof product.image === 'string' && /^(https?:\/\/|\/|\.\/|data:)/.test(product.image);

  if (looksLikeUrl) {
    return <img src={product.image} alt={product.name} />;
  }

  if (emojiOnly) {
    return <span>{product.image}</span>;
  }

  return <span>{product.image}</span>;
}
