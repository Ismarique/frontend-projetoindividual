import { useEffect, useState, type JSX } from 'react';
import { Link } from 'react-router-dom';
import MovimentacaoRequests from '../../../fetch/MovimentacaoRequests';
import type { MovimentacaoDTO } from '../../../dto/MovimentacaoDTO';

interface DetalhesMovimentacaoProps {id_movimentacao:number;}


function DetalhesMovimentacao({id_movimentacao}:DetalhesMovimentacaoProps): JSX.Element {
    const [movimentacao, setMovimentacao] = useState<MovimentacaoDTO>();
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
            async function buscarDados() {
                setCarregando(true)
                setErro(null)
                try{
                    const dados = await MovimentacaoRequests.obterMovimentacaoPorId(id_movimentacao);
                    if (dados) {
                        setMovimentacao (dados);
                    }else{
                        setErro ("movimentacao não encontrado")
                    }
                } catch (err){
                    console.error("erro ao carrega detalhes movimentacao:", err)
                    setErro("ocorreu um erro ao busar movimentacao")
                }
                finally {setCarregando(false)}
    
                
            }
                
    
            buscarDados();
        }, [id_movimentacao]);

    return (
        <main className="product-details-page">
            <div className="product-details-container">
                <Link to="/lista/movimentacao" className="product-details__back"><i className="pi pi-arrow-left"></i> Voltar para movimentações</Link>
                {carregando && <p className="product-details__message">Carregando movimentação...</p>}
                {!carregando && !movimentacao && <p className="product-details__message product-details__message--error">Movimentação não encontrada.</p>}
                {!carregando && movimentacao && (
                    <section className="product-details">
                        <p className="product-details__eyebrow2">DETALHES DA MOVIMENTAÇÃO</p>
                        <div className="product-details__header">
                            <div><p className="product-details__eyebrow">TIPO</p><h1 className="product-details__eyebrow3">{movimentacao.tipo}</h1></div>
                        </div>
                        <dl className="product-details__grid">
                            <div><dt>ID</dt><dd>{movimentacao.id_movimentacao ?? id_movimentacao}</dd></div>
                            <div><dt>Produto</dt><dd>{movimentacao.id_produto}</dd></div>
                            <div><dt>Motivo</dt><dd>{movimentacao.motivo}</dd></div>
                            <div><dt>Quantidade</dt><dd>{movimentacao.quantidade}</dd></div>
                            <div><dt>Preço unitário praticado</dt><dd>{Number(movimentacao.preco_unitario_praticado ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd></div>
                            <div><dt>Valor total</dt><dd>{Number(movimentacao.valor_total ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</dd></div>
                            <div><dt>Data</dt><dd>{movimentacao.data_movimentacao ? new Date(movimentacao.data_movimentacao).toLocaleString('pt-BR') : 'Não informado'}</dd></div>
                            <div><dt>Movimentação de origem</dt><dd>{movimentacao.id_movimentacao_origem ?? 'Não informado'}</dd></div>
                        </dl>
                        <div className="product-details__description"><h2>Observação</h2><p>{movimentacao.observacao || 'Não informado'}</p></div>
                    </section>
                )}
            </div>
        </main>
    );
}

export default DetalhesMovimentacao;
