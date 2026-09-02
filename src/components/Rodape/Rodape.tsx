import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="site-footer">
            <p className="site-footer__text">
                Copyright - Todos os direitos e esquerdos reservados
            </p>
            <p className="site-footer__text site-footer__author">
                ismael henrique cardoso dos santos
            </p>
        </footer>
    );
}

export default Rodape;