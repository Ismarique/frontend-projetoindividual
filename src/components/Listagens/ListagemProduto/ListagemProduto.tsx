import { useState, useEffect, type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import type ProdutoDTO from "../../../dto/ProdutoDTO";

function ListagemProdutos(): JSX.Element {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const listaDeProdutos = await ProdutoRequests.obterListaDeProdutos();
                setProdutos(listaDeProdutos ?? []);
            } catch (error) {
                console.error(`Erro ao buscar produtos. ${error}`);
            }
        };

        buscarProdutos();
    }, []);

    // Lógica de Paginação
    const totalPages = Math.ceil(produtos.length / rowsPerPage) || 1;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentProdutos = produtos.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="product-list w-full flex flex-col gap-6">
            <div className="product-list__toolbar">
                <div>
                    <p className="product-list__eyebrow">Catálogo</p>
                    <h1 className="product-list__title">Produtos cadastrados</h1>
                    <p className="product-list__subtitle">Consulte os produtos disponíveis no estoque.</p>
                </div>
                <Link
                    to="/cadastro/produto"
                    className="product-list__create"
                >
                    <i className="pi pi-plus text-sm"></i>
                    Novo Produto
                </Link>
            </div>

            {/* Container da Tabela */}
            <div className="product-list__card w-full bg-zinc-900/80 border border-emerald-500/20 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="product-table__scroll overflow-x-auto">
                    <table className="product-table w-full text-left text-sm text-zinc-300">
                        <thead className="bg-emerald-950/60 text-emerald-400 font-mono text-xs uppercase tracking-wider border-b border-emerald-500/30">
                            <tr>
                                <th className="py-3.5 px-4">ID</th>
                                <th className="py-3.5 px-4">Categoria</th>
                                <th className="py-3.5 px-4">Código</th>
                                <th className="py-3.5 px-4">Nome</th>
                                <th className="py-3.5 px-4">Descrição</th>
                                <th className="py-3.5 px-4">Preço</th>
                                <th className="py-3.5 px-4">Disponível</th>
                                <th className="py-3.5 px-4">Qtd. mínima</th>
                                <th className="py-3.5 px-4">Ativo</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {currentProdutos.length > 0 ? (
                                currentProdutos.map((produto) => (
                                    <tr key={produto.id_produto} className="hover:bg-emerald-950/20 transition-colors">
                                        <td className="py-3.5 px-4 text-zinc-500 font-mono text-xs">#{produto.id_produto}</td>
                                        <td className="py-3.5 px-4 font-mono text-zinc-400">{produto.id_categoria ?? 'Não informado'}</td>
                                        <td className="py-3.5 px-4 font-mono text-zinc-400">{produto.codigo}</td>
                                        <td className="py-3.5 px-4 font-semibold text-zinc-100">{produto.nome}</td>
                                        <td className="product-table__description">{produto.descricao || 'Não informado'}</td>
                                        <td className="py-3.5 px-4 text-emerald-400 font-mono font-semibold">
                                            {produto.preco_unitario > 0
                                                ? produto.preco_unitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                                : 'Não informado'}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="product-table__stock-value">{produto.quantidade_disponivel}</span>
                                            {produto.quantidade_disponivel <= produto.quantidade_minima && (
                                                <span className="product-table__low-stock">
                                                    Estoque baixo
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-mono">{produto.quantidade_minima}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`product-table__status ${produto.ativo ? 'is-active' : 'is-inactive'}`}>
                                                {produto.ativo ? 'Sim' : 'Não'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border ${
                                                produto.status === 'ativo'
                                                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' 
                                                    : 'bg-red-950/80 text-red-400 border-red-500/40'
                                            }`}>
                                                {produto.status || 'Não informado'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <button
                                                onClick={() => navigate(`/detalhes/produto/${produto.id_produto}`)}
                                                className="product-table__details"
                                            >
                                                Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="product-table__empty">
                                        Nenhum produto cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Controles de Paginação */}
                <div className="product-list__pagination">
                    <p>
                        Mostrando <strong>{produtos.length > 0 ? indexOfFirstRow + 1 : 0}</strong> até{' '}
                        <strong>{Math.min(indexOfLastRow, produtos.length)}</strong> de{' '}
                        <strong>{produtos.length}</strong> produtos
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="product-list__page-button"
                        >
                            <i className="pi pi-chevron-left"></i>
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`product-list__page-button ${currentPage === i + 1 ? 'is-active' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="product-list__page-button"
                        >
                            <i className="pi pi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListagemProdutos;