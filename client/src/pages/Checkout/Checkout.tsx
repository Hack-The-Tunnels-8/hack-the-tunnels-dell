import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page, ProductPreviewCard } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Checkout.style.scss";

function Checkout() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  const createOrder = async () => {
    const json = await ServiceAPI.createOrderWithOneItem(
      "Test Customer",
      "test@email.com",
      productId,
    );

    if (json.error !== null) {
      setMessage(json.error);
      return;
    }

    setMessage("Order created!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(productId);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="checkout-page">
        {message && <p className="adaptive">{message}</p>}
        {product && (
          <>
            <h2 className="adaptive">You are about to make an order with the following product:</h2>
            <div className="checkout-page__product adaptive">
              <h3 className="adaptive">Title: {product.title}</h3>
              <h3 className="ohYeah adaptive">💕💕Ohhhhhh Yeah💕💕</h3>
              <img className="FunnyPixelMan" src="../resources/this-man-pixel-art-fr-fr.jpg" alt="pixel art man" />
              
            </div>
            <Link to={`/products/${product.id}`} key={`${product.id}`}>
              <ProductPreviewCard
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                key={`${product.id}`}
              />
            </Link>
            <button className = "itsDaButton" onClick={() => createOrder()}>
              Create Order (with customer set in code)
            </button>
          </>
        )}
      </div>
    </Page>
  );
}

export default Checkout;
