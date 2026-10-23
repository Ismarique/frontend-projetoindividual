import { type JSX } from 'react';
import Navegacao from '../../../components/Navegacao/Navegacao';
import DetalhesMovimentacao from '../../../components/Detalhes/DetalhesMovimentacao/DetalhesMovimentacao';
import Rodape from '../../../components/Rodape/Rodape';
import { useParams } from 'react-router-dom';

const {id_movimentacao} = useParams ();

function PDetalhesMovimentacao(): JSX.Element {
    return <div className="min-h-screen flex flex-col">
        <Navegacao />
        <DetalhesMovimentacao id_movimentacao={Number(id_movimentacao)} />
        
        <Rodape /></div>;
}

export default PDetalhesMovimentacao;
