import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import DetalhesMovimentacao from '../../../components/Detalhes/DetalhesMovimentacao/DetalhesMovimentacao';
import Rodape from '../../../components/Rodape/Rodape';

function PDetalhesMovimentacao(): JSX.Element {
    return <div className="min-h-screen flex flex-col"><Navegacao /><DetalhesMovimentacao /><Rodape /></div>;
}

export default PDetalhesMovimentacao;
