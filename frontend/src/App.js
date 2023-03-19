import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { privateRoutes, publicRoutes } from './routes';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-bootstrap';
// import Header from './components/Header';
import Header from './components/Layout/Header';

function App() {
    return (
        <Router>
            <ToastContainer position="bottom-center" limit={1} />
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
            <Footer />
        </Router>
    );
}
export default App;
