import { useContext } from "react";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Intro from "./components/intro/Intro";
import ProductList from "./components/productList/ProductList";
import Toggle from "./components/toggle/Toggle";
import { ThemeContext } from "./context";

const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#222" : "white",
        color: darkMode && "white",
      }}
    >
      {/* <Toggle /> */}
      <Intro />
      
      <About position = {1} currImg = {1}/>
      
      <About position = {0} currImg = {2} />
      
      <About position = {1} currImg = {3}/>
      
      <About  position = {0} currImg = {4}/>
      
      <About  position = {1} currImg = {5}/>
      <ProductList />
      <Contact />
    </div>
  );
};

export default App;
