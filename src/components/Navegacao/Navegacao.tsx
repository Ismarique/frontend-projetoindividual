import { useState, useRef, useEffect, type JSX } from "react";
import { Link, useLocation } from 'react-router-dom';
import appIcon from "../../assets/hero.png";

function Navegacao(): JSX.Element {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const navLinks = [
        { label: 'Início', icon: 'pi pi-home', url: '/' },
        { label: 'Produtos', icon: 'pi pi-desktop', url: '/lista/produto' },
        { label: 'Categorias', icon: 'pi pi-tags', url: '/lista/categoria' },
    ];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="site-nav" ref={menuRef}>
            <div className="site-nav__inner">

                {/* Logo */}
                                <Link to="/" className="site-nav__brand" onClick={() => setMenuOpen(false)}>
                                        <img alt="Dinastia Necron" src={appIcon} className="site-nav__logo" />
                                        <span className="site-nav__brand-name">
                      Dinastia Necron
                    </span>
                </Link>

                {/* Links — desktop */}
                <nav className="site-nav__links site-nav__links--desktop" aria-label="Navegação principal">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.url;
                        return (
                            <Link
                                key={link.url}
                                to={link.url}
                                onClick={() => setMenuOpen(false)}
                                className={`site-nav__link
                                    ${isActive
                                        ? 'is-active'
                                        : ''
                                    }`}
                            >
                                <i className={`${link.icon} text-sm`}></i>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Botão — mobile */}
                <div className="site-nav__mobile-toggle">
                    <button
                        className="site-nav__menu-button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={menuOpen}
                    >
                        <i className={`pi ${menuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            {/* Menu Dropdown — mobile */}
            {menuOpen && (
                <nav className="site-nav__links site-nav__links--mobile" aria-label="Navegação mobile">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.url;
                        return (
                            <Link
                                key={link.url}
                                to={link.url}
                                onClick={() => setMenuOpen(false)}
                                className={`site-nav__link
                                    ${isActive
                                        ? 'is-active'
                                        : ''
                                    }`}
                            >
                                <i className={`${link.icon} text-base`}></i>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}

export default Navegacao;