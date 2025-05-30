/** @format */

import './Layout.scss';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import MetaHelper from './components/meta-helper/MetaHelper';

interface LayoutProps {
    children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <MetaHelper />
            <Nav />

            {children}

            <Footer />
        </>
    );
};
