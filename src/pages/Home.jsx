import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import Footer from "../components/footer/Footer";
import HotDealSection from "../components/deals/HotDealsSection";
import ShopSection from "../components/shop-collection/ShopCollection";
import Feature from "../components/feature/Feature";
import Trending from "../components/trending/Trending";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>
      <br />
      <ShopSection/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />

      <br />
      <HotDealSection/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <br/>
      <Feature/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <br />
      <Trending/>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList/>
      <br />
      <Footer/>
    </>
  );
};

export default Home;