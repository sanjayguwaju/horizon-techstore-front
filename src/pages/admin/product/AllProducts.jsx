import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const user = useSelector((state) => state.user);
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = async () => {
        setLoading(true);
        try {
        const res = await getProductsByCount(100);
        setProducts(res);
        setLoading(false);
        } catch (err) {
        console.log(err);
        setLoading(false);
        }
    };

    const handleRemove = async (slug) => {
      if (window.confirm("Delete?")) {
        try {
          const res = await removeProduct(slug, user.token);
          await loadAllProducts();
          toast.error(`${res.title} is deleted`);
        } catch (err) {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        }
      }
    };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard 
                product={product}
                handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
