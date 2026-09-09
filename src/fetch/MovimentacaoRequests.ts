import type { MovimentacaoDTO } from '../dto/MovimentacaoDTO';

const API_URL = import.meta.env.VITE_API_SERVER_URL || 'http://localhost:3333';

type MovimentacaoApi = Partial<MovimentacaoDTO> & {
    idMovimentacao?: number;
    idProduto?: number;
    idMovimentacaoOrigem?: number;
    precoUnitarioPraticado?: number;
    valorTotal?: number;
    dataMovimentacao?: string;
};

class MovimentacaoRequests {
    private serverURL = API_URL;
    private endpointMovimentacao = '/api/movimentacao';

    private normalizar(item: MovimentacaoApi): MovimentacaoDTO {
        return {
            id_movimentacao: item.id_movimentacao ?? item.idMovimentacao,
            id_produto: Number(item.id_produto ?? item.idProduto ?? 0),
            id_movimentacao_origem: item.id_movimentacao_origem ?? item.idMovimentacaoOrigem,
            tipo: item.tipo ?? '',
            motivo: item.motivo ?? '',
            quantidade: Number(item.quantidade ?? 0),
            preco_unitario_praticado: Number(item.preco_unitario_praticado ?? item.precoUnitarioPraticado ?? 0),
            valor_total: Number(item.valor_total ?? item.valorTotal ?? 0),
            observacao: item.observacao ?? '',
            data_movimentacao: item.data_movimentacao || item.dataMovimentacao
                ? new Date(item.data_movimentacao ?? item.dataMovimentacao as string)
                : undefined
        };
    }

    async obterListaDeMovimentacoes(): Promise<MovimentacaoDTO[]> {
        const respostaAPI = await this.buscar(this.endpointMovimentacao);
        const resposta: unknown = await respostaAPI.json();
        const respostaObjeto = typeof resposta === 'object' && resposta !== null
            ? resposta as { movimentacoes?: unknown; data?: unknown }
            : {};
        const dados = Array.isArray(resposta)
            ? resposta
            : respostaObjeto.movimentacoes ?? respostaObjeto.data ?? [];

        if (!Array.isArray(dados)) throw new Error('A API retornou uma lista de movimentações inválida.');
        return dados.map((item) => this.normalizar(item as MovimentacaoApi));
    }

    async obterMovimentacaoPorId(id_movimentacao: number): Promise<MovimentacaoDTO | undefined> {
        try {
            const respostaAPI = await this.buscar(`${this.endpointMovimentacao}/${id_movimentacao}`);
            return this.normalizar(await respostaAPI.json() as MovimentacaoApi);
        } catch (error) {
            console.error(`Erro ao buscar movimentação. ${error}`);
            return undefined;
        }
    }

    async enviarFormularioMovimentacao(movimentacao: MovimentacaoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMovimentacao}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(movimentacao)
            });

            if (!respostaAPI.ok) {
                const erro = await respostaAPI.text();
                throw new Error(`Erro ${respostaAPI.status}: ${erro || respostaAPI.statusText}`);
            }
            return true;
        } catch (error) {
            console.error(`Erro ao cadastrar movimentação. ${error}`);
            return false;
        }
    }

    async atualizarMovimentacao(id_movimentacao: number, movimentacao: MovimentacaoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMovimentacao}/${id_movimentacao}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(movimentacao)
            });
            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao atualizar movimentação. ${error}`);
            return false;
        }
    }

    private async buscar(endpoint: string): Promise<Response> {
        const token = localStorage.getItem('token');
        const respostaAPI = await fetch(`${this.serverURL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        });
        if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
        return respostaAPI;
    }
}

export default new MovimentacaoRequests();
