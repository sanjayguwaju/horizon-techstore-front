import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";
import { setCOD } from "./reducers/CODReducer";

const Cart = () => {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const { slug } = useParams();

  const saveOrderToDb = async () => {
    try {
      const res = await userCart(cart, user.token);
      if (res.data.ok) navigate("/user/checkout");
    } catch (err) {
      console.error("Error saving cart", err);
      // Display error to user, or handle it in some other way
    }
  };

  const saveCashOrderToDb = async () => {
    try {
      dispatch(setCOD(true));
      const res = await userCart(cart, user.token);
      if (res.data.ok) navigate("/user/checkout");
    } catch (err) {
      console.error("Error saving cart", err);
    }
  };

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };


  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
                onClick={saveOrderToDb}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={() => navigate("/login", { state: { from: "/cart" } })}
            >
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
