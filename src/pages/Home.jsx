import { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    try {
      const res = await getProductsByCount(3);
      setProducts(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>react home</p>
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;
