import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import ListagemMovimentacoes from '../../../components/Listagens/ListagemMovimentacao/ListagemMovimentacao';
import Rodape from '../../../components/Rodape/Rodape';

function PListagemMovimentacao(): JSX.Element {
    return <div className="min-h-screen flex flex-col">
        <Navegacao /><ListagemMovimentacoes />
        <Rodape />
        </div>;
}

export default PListagemMovimentacao;
