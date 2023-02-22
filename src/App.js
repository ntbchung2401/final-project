import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to='/'>ChungStore</Link>
        </header>
        <main>
          <Routes>
            <Route path='/product/:display' element={<ProductScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    /* <div className="page">
      <LoginForm />
    </div> */
  );
}

export default App;
