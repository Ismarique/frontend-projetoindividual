import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import DetalhesProduto from "../../../components/Detalhes/DetalhesProduto/DetalhesProduto";
import { useParams } from "react-router-dom";

function PDetalhesProduto(): JSX.Element {
 
    const {id_produto} = useParams ();

	return (
		<div className="min-h-screen flex flex-col">
			<Navegacao />
			<DetalhesProduto id_produto={Number(id_produto)} />
            
			<Rodape />
		</div>
	);
}

export default PDetalhesProduto;
