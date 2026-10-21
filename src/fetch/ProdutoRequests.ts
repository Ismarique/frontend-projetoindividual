// Classe responsável por fazer requisições à API - produto
import type ProdutoDTO from "../dto/ProdutoDTO";


const API_URL = import.meta.env.VITE_API_SERVER_URL || "http://localhost:3333";

type ProdutoApi = Partial<ProdutoDTO> & {
    idProduto?: number;
    idCategoria?: number;
    dataCadastro?: string;
    nome?: string;
    codigo?: number | string;
    preco?: number;
    precoUnitario?: number;
    quantidadeDisponivel?: number;
    quantidadeMinima?: number;
    ativo?: boolean
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
                data_cadastro: item.data_cadastro ?? item.dataCadastro,
                nome: item.nome ?? item.nome ?? item.descricao ?? "Produto sem nome",
                codigo: String(item.codigo ?? item.codigo ?? ""),
                descricao: item.descricao ?? "",
                preco_unitario: Number(item.preco_unitario ?? item.preco ?? item.precoUnitario ?? 0),
                quantidade_disponivel: Number(item.quantidade_disponivel ?? item.quantidadeDisponivel ?? 0),
                quantidade_minima: Number(item.quantidade_minima ?? item.quantidadeMinima ?? 0),
                ativo: item.ativo ?? true,
            }));
        } catch (error) {
            console.error(`Erro ao fazer a consulta de produtos. ${error}`);
            throw error;
        }
    }

 async obterProdutoPorId(id_produto: number): Promise<ProdutoDTO | undefined> {
     try {
         const token = localStorage.getItem('token');
         const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}/${id_produto}`, {
             headers: {
                 'Content-Type': 'application/json',
                 'x-access-token': `${token}`
             }
         });
         if (respostaAPI.ok) {
             const produto: ProdutoDTO = await respostaAPI.json();
             return produto;
         } else {
             throw new Error("Não foi possível buscar o produto.");
         }
         
     } catch (error) {
         console.error(`Erro ao fazer a consulta de produto por ID. ${error}`);
         return;
     }
 }

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
    async atualizarProduto(id_produto: number, formProduto: ProdutoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointProduto}/${id_produto}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formProduto)
            });
            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao atualizar produto. ${error}`);
            return false;
        }
    }


}

export default new ProdutoRequests;