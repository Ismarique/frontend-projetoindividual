import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import MovimentacaoRequests from '../../../fetch/MovimentacaoRequests';
import type { MovimentacaoDTO } from '../../../dto/MovimentacaoDTO';

function FormMovimentacao() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<MovimentacaoDTO>({
		id_produto: 0,
		tipo: '',
		motivo: '',
		quantidade: 0,
		//preco_unitario_praticado: 0,
		//valor_total: 0,
		observacao: '',
		data_movimentacao: new Date()
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;
		const camposNumericos = ['id_produto', 'id_movimentacao_origem', 'quantidade', 'preco_unitario_praticado'];

		if (name === 'data_movimentacao') {
			setFormData(prev => ({ ...prev, data_movimentacao: value ? new Date(`${value}T00:00:00`) : undefined }));
			return;
		}

		if (camposNumericos.includes(name)) {
			const valor = Number(value);
			setFormData(prev => ({
				...prev,
				[name]: valor,
				...(name === 'quantidade' || name === 'preco_unitario_praticado'
					? { valor_total: name === 'quantidade' ? valor * (prev.preco_unitario_praticado ?? 0) : (prev.quantidade * valor) }
					: {})
			}));
			return;
		}

		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formData.id_produto < 1 || formData.quantidade < 1) {
			alert('Informe um produto e uma quantidade válidos.');
			return;
		}

		const resposta = await MovimentacaoRequests.enviarFormularioMovimentacao(formData);
		if (resposta) {
			alert('Movimentação cadastrada com sucesso');
			navigate('/lista/movimentacao');
		} else {
			alert('Erro ao cadastrar movimentação');
		}
	};

	

	return (
		<main className="product-form-page">
			<div className="product-form-container">
				<form onSubmit={handleSubmit} className="product-form">
					<div className="product-form__header">
						<span className="product-form__eyebrow">Estoque</span>
						<h1 className="product-form__title">Cadastro de <span>Movimentação</span></h1>
						<p className="product-form__subtitle">Registre uma entrada ou saída de estoque.</p>
					</div>

					<div className="product-form__fields">
						<div className="product-form__row">
							<div className="product-form__field">
								<label htmlFor="id_produto" className="product-form__label">ID do produto</label>
								<input id="id_produto" name="id_produto" type="number" min={1} required value={formData.id_produto || ''} onChange={handleChange} className="product-form__input" />
							</div>
							<div className="product-form__field">
								<label htmlFor="tipo" className="product-form__label">Tipo</label>
								<select id="tipo" name="tipo" required value={formData.tipo} onChange={handleChange} className="product-form__input">
									<option value="">Selecione o tipo</option>
									<option value="ENTRADA">Entrada</option>
									<option value="SAIDA">Saída</option>
								</select>
							</div>
						</div>

						<div className="product-form__field">
							<label htmlFor="motivo" className="product-form__label">Motivo</label>
							<select id="motivo" name="motivo" required value={formData.motivo} onChange={handleChange} className="product-form__input">
								<option value="">Selecione o motivo</option>
								<option value="RECEBIMENTO">RECEBIMENTO</option>
								<option value="VENDA">VENDA</option>
									<option value="USO_INTERNO">USO_INTERNO</option>
									<option value="PERDA">PERDA</option>
									<option value="DANIFICADO">DANIFICADO</option>
									<option value="CORRECAO">CORRECAO</option>
							</select>
						</div>

						<div className="product-form__row product-form__row--metrics">
							<div className="product-form__field">
								<label htmlFor="quantidade" className="product-form__label">Quantidade</label>
								<input id="quantidade" name="quantidade" type="number" min={1} required value={formData.quantidade || ''} onChange={handleChange} className="product-form__input" />
							</div>
						</div>

						<div className="product-form__field">
							<label htmlFor="observacao" className="product-form__label">Observação</label>
							<textarea id="observacao" name="observacao" required rows={4} value={formData.observacao} onChange={handleChange} placeholder="Descreva a movimentação" className="product-form__input product-form__textarea" />
						</div>
					</div>

					<div className="product-form__actions">
						<input type="submit" value="CADASTRAR MOVIMENTAÇÃO" className="product-form__submit" />
						<button type="button" onClick={() => navigate('/lista/movimentacao')} className="product-form__cancel">VOLTAR PARA LISTAGEM</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default FormMovimentacao;
