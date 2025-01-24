import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "./contexts/UserContext";

//만약 토큰이 있으면 axios 설정에 추가됨
setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); //장바구니
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]; //장바구니 복사
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    //DB에 장바구니(cart) 저장 (유저별) {제품ID, 개수}
    addToCartAPI(product._id, quantity)
      .then((res) => toast.success("상품 추가 성공!"))
      .catch((err) => toast.error("상품 추가에 실패했습니다."));
  };
  //서버에서 장바구니 정보 가져옴
  const getCart = () => {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => toast.error("카트 가져오기 실패!"));
  };
  useEffect(() => {
    if (user) getCart();
  }, [user]);
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload(); //재시작(새로고침)
      } else {
        setUser(jwtUser);
      }
    } catch (error) {} //토큰이 없을경우는 그냥 go
  }, []);
  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navbar user={user} cartCount={cart.length} />
        <main>
          <ToastContainer position="bottom-right" />
          <Routing addToCart={addToCart} cart={cart} />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
