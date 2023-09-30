import "./ProductPreviewCard.style.scss";

interface Props {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

function ProductPreviewcard({ title, description, price, imageUrl }: Props) {
  return (
    <div className="product-preview-card">
      <img className="product-preview-card__image" src={imageUrl} alt={title} />
      <div className="chadApproval">
        <img src="https://www.jcchouinard.com/wp-content/uploads/2019/11/jean-christophe-chouinard-seo-expert-quebec.jpg" alt="That one guy" className="funnyGuy"/>
        Chad approved👍👍👍
      </div>
      <h3 className="product-preview-card__title">{title}</h3>
      <p className="product-preview-card__description">{description}</p>
      <p> Pee Pee Poo Poo </p>
      <p className="product-preview-card__price">${price}</p>
    </div>
  );
}

export default ProductPreviewcard;
