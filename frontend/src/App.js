import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { privateRoutes, publicRoutes } from './routes';
import Container from 'react-bootstrap/Container';
// import { ToastContainer } from 'react-bootstrap';
// import Header from './components/Header';
import Header from './components/Layout/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "~/components/GlobalStyles/index.js"
function App() {
    return (
        <>
            <Router>
                <ToastContainer position="top-right" limit={1} />
                {/* <Header /> */}

                <Header />
                <Container className="mt-3">
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            const Auth = route.role;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Auth>
                                            <Page />
                                        </Auth>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </Container>
                <footer className='footer'>
                <Footer />
                </footer>
            </Router>
        </>
    );
}
export default App;
