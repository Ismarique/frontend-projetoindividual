import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import ListagemCategorias from '../../../components/Listagens/ListagemCategoria/ListagemCategoria';
import Rodape from '../../../components/Rodape/Rodape';

function PListagemCategoria(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col">
			<Navegacao />
			<ListagemCategorias />
			<Rodape />
		</div>
	);
}

export default PListagemCategoria;
