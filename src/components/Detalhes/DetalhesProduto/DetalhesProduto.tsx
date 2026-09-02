import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import ProdutoRequests from "../../../fetch/ProdutoRequests";
import type ProdutoDTO from "../../../dto/ProdutoDTO";

interface DetalhesProdutoProps {id_produto:number;}



function DetalhesProduto({id_produto}:DetalhesProdutoProps): JSX.Element {
    const [produto, setProduto] = useState<ProdutoDTO>();
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        async function buscarDados() {
            setCarregando(true)
            setErro(null)
            try{
                const dados = await ProdutoRequests.obterProdutoPorId(id_produto);
                if (dados) {
                    setProduto (dados);
                }else{
                    setErro ("produto não encontrado")
                }
            } catch (err){
                console.error("erro ao carrega detalhes produto:", err)
                setErro("ocorreu um erro ao busar produtos")
            }
            finally {setCarregando(false)}

            
        }
            

        buscarDados();
    }, [id_produto]);

    return (
        <main className="product-details-page">
            <div className="product-details-container">
                <Link to="/lista/produto" className="product-details__back">
                    <i className="pi pi-arrow-left"></i>
                    Voltar para produtos
                </Link>

                {carregando && <p className="product-details__message">Carregando produto...</p>}
                {!carregando && erro && <p className="product-details__message product-details__message--error">{erro}</p>}
                {!carregando && produto && (
                    <section className="product-details">
                        <p className="product-details__eyebrow2">DETALHES DO PRODUTO</p>
                        <div className="product-details__header">
                            <div>
                                <p className="product-details__eyebrow">NOME DO PRODUTO:</p>
                                <h1 className="product-details__eyebrow3">{produto.nome}</h1>
                            </div>
                            <span className={`product-table__status ${produto.ativo ? 'is-active' : 'is-inactive'}`}>
                                {produto.ativo ? "Ativo" : "Inativo"}
                            </span>
                        </div>

                        <dl className="product-details__grid">
                            <div><dt>ID</dt><dd>{produto.id_produto ?? id_produto}</dd></div>
                            <div><dt>Código</dt><dd>{produto.codigo}</dd></div>
                            <div><dt>Categoria</dt><dd>{produto.id_categoria ?? produto.id_categoria}</dd></div>
                            <div><dt>Preço unitário</dt><dd>{Number(produto.preco_unitario).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</dd></div>
                            <div><dt>Disponível</dt><dd>{produto.quantidade_disponivel}</dd></div>
                            <div><dt>Quantidade mínima</dt><dd>{produto.quantidade_minima}</dd></div>
                            <div><dt>Data de cadastro</dt><dd>{produto.data_cadastro ? new Date(produto.data_cadastro).toLocaleDateString("pt-BR") : "Não informado"}</dd></div>
                        </dl>

                        <div className="product-details__description">
                            <h2>Descrição</h2>
                            <p>{produto.descricao || "Não informado"}</p>
                        </div>
                        
                    </section>
                )}
            </div>
        </main>
    );
}

export default DetalhesProduto;
