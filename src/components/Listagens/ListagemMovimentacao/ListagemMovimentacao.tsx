import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovimentacaoRequests from '../../../fetch/MovimentacaoRequests';
import type { MovimentacaoDTO } from '../../../dto/MovimentacaoDTO';

function ListagemMovimentacoes(): JSX.Element {
    const [movimentacoes, setMovimentacoes] = useState<MovimentacaoDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        MovimentacaoRequests.obterListaDeMovimentacoes()
            .then(setMovimentacoes)
            .catch(error => console.error(`Erro ao buscar movimentações. ${error}`));
    }, []);

    const totalPages = Math.ceil(movimentacoes.length / rowsPerPage) || 1;
    const indexOfLastRow = currentPage * rowsPerPage;
    const currentMovimentacoes = movimentacoes.slice(indexOfLastRow - rowsPerPage, indexOfLastRow);

    return (
        <div className="product-list w-full flex flex-col gap-6">
            <div className="product-list__toolbar">
                <div>
                    <p className="product-list__eyebrow">Estoque</p>
                    <h1 className="product-list__title">Movimentações</h1>
                    <p className="product-list__subtitle">Consulte as entradas e saídas registradas.</p>
                </div>
                <Link to="/cadastro/movimentacao" className="product-list__create">
                    <i className="pi pi-plus text-sm"></i>
                    Nova Movimentação
                </Link>
            </div>
            <div className="product-list__card w-full bg-zinc-900/80 border border-emerald-500/20 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="product-table__scroll overflow-x-auto">
                    <table className="product-table w-full text-left text-sm text-zinc-300">
                        <thead>
                            <tr>
                                <th>ID</th><th>Produto</th><th>Tipo</th><th>Motivo</th><th>Quantidade</th><th>Valor total</th><th>Data</th><th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMovimentacoes.length > 0 ? currentMovimentacoes.map(movimentacao => (
                                <tr key={movimentacao.id_movimentacao}>
                                    <td>#{movimentacao.id_movimentacao}</td>
                                    <td>{movimentacao.id_produto}</td>
                                    <td>{movimentacao.tipo}</td>
                                    <td>{movimentacao.motivo}</td>
                                    <td>{movimentacao.quantidade}</td>
                                    <td>{Number(movimentacao.valor_total ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                    <td>{movimentacao.data_movimentacao ? new Date(movimentacao.data_movimentacao).toLocaleDateString('pt-BR') : 'Não informado'}</td>
                                    <td className="text-center">
                                        <button className="product-table__details" onClick={() => navigate(`/detalhes/movimentacao/${movimentacao.id_movimentacao}`)}>Detalhes</button>
                                     </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={8} className="product-table__empty">Nenhuma movimentação cadastrada.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="product-list__pagination">
                    <p>Mostrando <strong>{movimentacoes.length ? (currentPage - 1) * rowsPerPage + 1 : 0}</strong> até <strong>{Math.min(indexOfLastRow, movimentacoes.length)}</strong> de <strong>{movimentacoes.length}</strong> movimentações</p>
                    <div className="flex items-center gap-1">
                        <button className="product-list__page-button" disabled={currentPage === 1} onClick={() => setCurrentPage(page => Math.max(1, page - 1))}>Anterior</button>
                        {[...Array(totalPages)].map((_, index) => <button className={`product-list__page-button ${currentPage === index + 1 ? 'is-active' : ''}`} key={index + 1} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>)}
                        <button className="product-list__page-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}>Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListagemMovimentacoes;
