import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import FormMovimentacao from '../../../components/Formularios/FormMovimentacao/FormMovimentacao';
import Rodape from '../../../components/Rodape/Rodape';

function PCadastroMovimentacao(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormMovimentacao />
            <Rodape />
        </div>
    );
}

export default PCadastroMovimentacao;
