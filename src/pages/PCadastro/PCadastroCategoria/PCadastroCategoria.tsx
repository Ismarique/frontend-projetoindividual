import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import FormCategoria from '../../../components/Formularios/FormCategoria/FormCategoria';
import Rodape from '../../../components/Rodape/Rodape';

function PCadastroCategoria(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col">
			<Navegacao />
			<FormCategoria />
			<Rodape />
		</div>
	);
}

export default PCadastroCategoria;
