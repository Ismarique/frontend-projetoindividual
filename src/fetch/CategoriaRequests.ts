import type { CategoriaDTO } from '../dto/CategoriaDTO';

const API_URL = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3333';

type CategoriaApi = {
    id_categoria?: number;
    idCategoria?: number;
    id?: number;
    nome?: string;
};

class CategoriaRequests {
    private serverURL = API_URL;
    private endpointCategoria = '/api/categorias';

    async obterListaDeCategorias(): Promise<CategoriaDTO[]> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCategoria}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (!respostaAPI.ok) {
                throw new Error(`Não foi possível listar as categorias. Status: ${respostaAPI.status}`);
            }

            const resposta: unknown = await respostaAPI.json();
            const respostaObjeto = typeof resposta === 'object' && resposta !== null
                ? resposta as { categorias?: unknown; data?: unknown }
                : {};
            const dados = Array.isArray(resposta)
                ? resposta
                : respostaObjeto.categorias ?? respostaObjeto.data ?? [];

            if (!Array.isArray(dados)) {
                throw new Error('A API retornou uma lista de categorias inválida.');
            }

            return (dados as CategoriaApi[]).map((item) => ({
                id_categoria: item.id_categoria ?? item.idCategoria ?? item.id,
                nome: item.nome ?? 'Categoria sem nome'
            }));
        } catch (error) {
            console.error(`Erro ao buscar categorias. ${error}`);
            throw error;
        }
    }

    async obterCategoriaPorId(id_categoria: number): Promise<CategoriaDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCategoria}/${id_categoria}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });
            if (!respostaAPI.ok) throw new Error('Não foi possível buscar a categoria.');

            const item = await respostaAPI.json() as {
                id_categoria?: number;
                idCategoria?: number;
                id?: number;
                nome?: string;
            };
            return {
                id_categoria: item.id_categoria ?? item.idCategoria ?? item.id ?? id_categoria,
                nome: item.nome ?? ''
            };
        } catch (error) {
            console.error(`Erro ao buscar categoria. ${error}`);
            return undefined;
        }
    }

    async atualizarCategoria(id_categoria: number, formCategoria: CategoriaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCategoria}/${id_categoria}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCategoria)
            });
            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao atualizar categoria. ${error}`);
            return false;
        }
    }

    async enviarFormularioCategoria(formCategoria: CategoriaDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointCategoria}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formCategoria)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            return true;
        } catch (error) {
            console.error(`Erro ao cadastrar categoria. ${error}`);
            return false;
        }
    }
}

export default new CategoriaRequests();