import { type JSX } from "react";
//import Navegacao from "../../../components/Navegacao/Navegacao";
import LoginForm from "../../components/Formularios/FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";

// Componente funcional que representa a página de login
function PLogin(): JSX.Element {
    return (
        <div className="pagina-grid">
            <LoginForm />
            <Rodape />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PLogin;
