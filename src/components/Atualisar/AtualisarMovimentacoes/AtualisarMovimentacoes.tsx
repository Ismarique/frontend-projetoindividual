import { useEffect, useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovimentacaoRequests from '../../../fetch/MovimentacaoRequests';
import type { MovimentacaoDTO } from '../../../dto/MovimentacaoDTO';

const movimentacaoVazia: MovimentacaoDTO = {
    id_produto: 0,
    tipo: '',
    motivo: '',
    quantidade: 0,
    preco_unitario_praticado: 0,
    valor_total: 0,
    observacao: ''
};

function AtualisarMovimentacoes(): JSX.Element {
    const { id_movimentacao } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<MovimentacaoDTO>(movimentacaoVazia);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        MovimentacaoRequests.obterMovimentacaoPorId(Number(id_movimentacao))
            .then(movimentacao => movimentacao && setFormData(movimentacao))
            .finally(() => setCarregando(false));
    }, [id_movimentacao]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const camposNumericos = ['id_produto', 'id_movimentacao_origem', 'quantidade', 'preco_unitario_praticado', 'valor_total'];
        setFormData(prev => ({ ...prev, [name]: camposNumericos.includes(name) ? Number(value) : value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const atualizado = await MovimentacaoRequests.atualizarMovimentacao(Number(id_movimentacao), formData);
        if (atualizado) {
            alert('Movimentação atualizada com sucesso');
            navigate('/lista/movimentacao');
        } else {
            alert('Erro ao atualizar movimentação');
        }
    };

    if (carregando) return <main className="product-form-page"><p>Carregando movimentação...</p></main>;

    return (
        <main className="product-form-page">
            <div className="product-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="product-form__header"><span className="product-form__eyebrow">Estoque</span><h1 className="product-form__title">Atualizar <span>Movimentação</span></h1><p className="product-form__subtitle">Altere os dados do registro de estoque.</p></div>
                    <div className="product-form__fields">
                        <div className="product-form__row">
                            <div className="product-form__field"><label htmlFor="tipo" className="product-form__label">Tipo</label><input id="tipo" name="tipo" required value={formData.tipo} onChange={handleChange} className="product-form__input" /></div>
                        </div>
                        <div className="product-form__row">
                            <div className="product-form__field"><label htmlFor="motivo" className="product-form__label">Motivo</label><input id="motivo" name="motivo" required value={formData.motivo} onChange={handleChange} className="product-form__input" /></div>
                            <div className="product-form__field"><label htmlFor="quantidade" className="product-form__label">Quantidade</label><input id="quantidade" name="quantidade" type="number" min={1} required value={formData.quantidade} onChange={handleChange} className="product-form__input" /></div>
                        </div>
                        <div className="product-form__row">
                            <div className="product-form__field"><label htmlFor="preco_unitario_praticado" className="product-form__label">Preço unitário</label><input id="preco_unitario_praticado" name="preco_unitario_praticado" type="number" min={0} step="0.01" value={formData.preco_unitario_praticado ?? 0} onChange={handleChange} className="product-form__input" /></div>
                            <div className="product-form__field"><label htmlFor="valor_total" className="product-form__label">Valor total</label><input id="valor_total" name="valor_total" type="number" min={0} step="0.01" value={formData.valor_total ?? 0} onChange={handleChange} className="product-form__input" /></div>
                        </div>
                        <div className="product-form__field"><label htmlFor="id_movimentacao_origem" className="product-form__label">ID da movimentação de origem</label><input id="id_movimentacao_origem" name="id_movimentacao_origem" type="number" min={1} value={formData.id_movimentacao_origem ?? ''} onChange={handleChange} className="product-form__input" /></div>
                        <div className="product-form__field"><label htmlFor="observacao" className="product-form__label">Observação</label><textarea id="observacao" name="observacao" required rows={4} value={formData.observacao} onChange={handleChange} className="product-form__input product-form__textarea" /></div>
                    </div>
                    <div className="product-form__actions"><input type="submit" value="SALVAR ALTERAÇÕES" className="product-form__submit" /><button type="button" onClick={() => navigate('/lista/movimentacao')} className="product-form__cancel">VOLTAR</button></div>
                </form>
            </div>
        </main>
    );
}

export default AtualisarMovimentacoes;
