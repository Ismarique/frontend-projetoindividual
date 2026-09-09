import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import Rodape from '../../../components/Rodape/Rodape';
import AtualisarCategorias from '../../../components/Atualisar/AtualisarCategorias/AtualisarCategorias';

function PCadastroCategoria(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col">
			<Navegacao />
			<AtualisarCategorias />
			<Rodape />
		</div>
	);
}

export default PCadastroCategoria;