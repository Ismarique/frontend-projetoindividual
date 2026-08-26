// Classe responsável por fazer requisições à API - produto
import type ProdutoDTO from "../dto/ProdutoDTO";

const API_URL = import.meta.env.VITE_API_SERVER_URL || "http://localhost:8080";

type ProdutoApi = Partial<ProdutoDTO> & {
    idProduto?: number;
    idCategoria?: number;
    nomeProduto?: string;
    nome?: string;
    codigoProduto?: number;
    codigo?: number;
    preco?: number;
    precoProduto?: number;
    quantidadeEstoque?: number;
    quantidadeDisponivel?: number;
    quantidadeMinima?: number;
};

class ProdutoRequests {
    private serverURL;
    private endpointProduto;

    constructor() {
        this.serverURL = API_URL;
        this.endpointProduto = `/api/produtos`;
    }

    async obterListaDeProdutos(): Promise<ProdutoDTO[]> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (!respostaAPI.ok) {
                throw new Error(`Não foi possível listar os produtos. Status: ${respostaAPI.status}`);
            }

            const resposta: unknown = await respostaAPI.json();
            const respostaObjeto = typeof resposta === "object" && resposta !== null
                ? resposta as { produtos?: unknown; data?: unknown }
                : {};
            const dados = Array.isArray(resposta)
                ? resposta
                : respostaObjeto.produtos ?? respostaObjeto.data ?? [];

            if (!Array.isArray(dados)) {
                throw new Error("A API retornou uma lista de produtos inválida.");
            }

            return dados.map((item: ProdutoApi) => ({
                id_produto: item.id_produto ?? item.idProduto,
                id_categoria: Number(item.id_categoria ?? item.idCategoria ?? 0),
                nome: item.nome ?? item.nomeProduto ?? item.descricao ?? "Produto sem nome",
                codigo: item.codigo ?? item.codigoProduto ?? item.id_produto ?? item.idProduto ?? 0,
                descricao: item.descricao ?? "",
                preco_unitario: Number(item.preco_unitario ?? item.preco ?? item.precoProduto ?? 0),
                quantidade_disponivel: Number(item.quantidade_disponivel ?? item.quantidadeDisponivel ?? item.quantidadeEstoque ?? 0),
                quantidade_minima: Number(item.quantidade_minima ?? item.quantidadeMinima ?? 0),
                ativo: item.ativo ?? true,
                status: item.status ?? (item.ativo === false ? "inativo" : "ativo")
            }));
        } catch (error) {
            console.error(`Erro ao fazer a consulta de produtos. ${error}`);
            throw error;
        }
    }

//    async obterProdutoPorId(id_produto: number): Promise<ProdutoDTO | undefined> {
//        try {
//            const token = localStorage.getItem('token');
//            const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}/${id_produto}`, {
//                headers: {
//                    'Content-Type': 'application/json',
//                    'x-access-token': `${token}`
//                }
//            });
//            if (respostaAPI.ok) {
//                const produto: ProdutoDTO = await respostaAPI.json();
//                return produto;
//            } else {
//                throw new Error("Não foi possível buscar o produto.");
//            }
//        } catch (error) {
//            console.error(`Erro ao fazer a consulta de produto por ID. ${error}`);
//            return;
//        }
//    }
//
        async enviarFormularioProduto(formProduto: ProdutoDTO): Promise<boolean> {
            try {
                const token = localStorage.getItem('token');
                const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    },
                    body: JSON.stringify(formProduto)
                });
                if (!respostaAPI.ok) {
                    const erro = await respostaAPI.text();
                    throw new Error(`Erro ${respostaAPI.status}: ${erro || respostaAPI.statusText}`);
                }
                console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
                return true;
            } catch (error) {
                console.error(`Erro ao fazer consulta à API. ${error}`);
                return false;
            }
        }
//
//    async atualizarProduto(id_produto: number, formProduto: ProdutoDTO): Promise<boolean> {
//        try {
//            const token = localStorage.getItem('token');
//            const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}/${id_produto}`, {
//                method: 'PUT',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'x-access-token': `${token}`
//                },
//                body: JSON.stringify(formProduto)
//            });
//            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
//            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
//            return true;
//        } catch (error) {
//            console.error(`Erro ao fazer consulta à API. ${error}`);
//            return false;
//        }
//    }
//
//    async removerProduto(id_produto: number): Promise<boolean> {
//        try {
//            const token = localStorage.getItem('token');
//            const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}/${id_produto}`, {
//                method: 'DELETE',
//                headers: {
//                    'Content-Type': 'application/json',
//                    'x-access-token': `${token}`
//                }
//            });
//            if (!respostaAPI.ok) {
//                const errorData = await respostaAPI.json().catch(() => ({}));
//                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
//                throw new Error(errorMessage);
//            }
//            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);
//            return true;
//        } catch (error) {
//            console.error(`Erro ao fazer consulta à API. ${error}`);
//            throw error;
//        }
//    }
}

export default new ProdutoRequests;