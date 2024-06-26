import ModalImage from "react-modal-image";
import laptop from "../../assets/images/computer/laptop.png";
import { useDispatch } from "react-redux";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { addToCart } from "../../pages/reducers/cartReducer";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();
  const getCartFromLocalStorage = () => {
    if (typeof window !== "undefined" && localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    return [];
  };

  const setCartInLocalStorage = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = getCartFromLocalStorage();

    cart.map((product, i) => {
      if (product._id === p._id) {
        cart[i].color = e.target.value;
      }
    });

    setCartInLocalStorage(cart);
    dispatch(addToCart(cart));
  };

  const handleQuantityChange = (e) => {
      let count = e.target.value < 1 ? 1 : e.target.value;

      if (count > p.quantity) {
        toast.error(`Max available quantity: ${p.quantity}`);
        return;
      }

      let cart = getCartFromLocalStorage();

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      setCartInLocalStorage(cart);
      dispatch(addToCart(cart))
  };

  const handleRemove = () => {
    let cart = getCartFromLocalStorage();

    let updatedCart = cart.filter((product) => product?._id !== p?._id);

    setCartInLocalStorage(updatedCart);
    
    dispatch(addToCart(updatedCart));
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={handleRemove}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
