import { useState, useRef, useEffect, type JSX } from "react";
import { Link, useLocation } from 'react-router-dom';
import appIcon from "../../assets/appIcon..png";

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

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="bg-zinc-950/90 backdrop-blur-md border-b border-emerald-500/30 sticky top-0 z-50" ref={menuRef}>
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 min-h-[64px]">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                    <img alt="logo" src={appIcon} className="h-9 w-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold hidden sm:inline-block">
                      Dinastia Necron
                    </span>
                </Link>

                {/* Links — desktop */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.url;
                        return (
                            <Link
                                key={link.url}
                                to={link.url}
                                className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all duration-200
                                    ${isActive
                                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                        : 'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/30'
                                    }`}
                            >
                                <i className={`${link.icon} text-sm`}></i>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Botão — mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        className="p-2 rounded border border-emerald-500/40 bg-zinc-900 text-emerald-400 hover:bg-emerald-950 transition-colors cursor-pointer"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Abrir menu"
                    >
                        <i className={`pi ${menuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
                    </button>
                </div>
            </div>

            {/* Menu Dropdown — mobile */}
            {menuOpen && (
                <nav className="md:hidden bg-zinc-950 border-b border-emerald-500/30 px-4 py-3 flex flex-col gap-2">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.url;
                        return (
                            <Link
                                key={link.url}
                                to={link.url}
                                className={`flex items-center gap-3 px-4 py-3 rounded font-mono text-xs uppercase tracking-wider transition-colors
                                    ${isActive
                                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                                        : 'text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/30'
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