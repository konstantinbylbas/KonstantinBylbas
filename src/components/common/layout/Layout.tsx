/** @format */

import './Layout.scss';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

interface LayoutProps {
    children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Nav />

            {children}

            <Footer />
        </>
    );
};
