import { useEffect, useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProdutoRequests from '../../../fetch/ProdutoRequests';
import type ProdutoDTO from '../../../dto/ProdutoDTO';

const produtoVazio: ProdutoDTO = {
	id_categoria: 0,
	data_cadastro: '',
	nome: '',
	codigo: '',
	descricao: '',
	preco_unitario: 0,
	quantidade_disponivel: 0,
	quantidade_minima: 0,
	ativo: true
};

function AtualisarProdutos(): JSX.Element {
	const { id_produto } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<ProdutoDTO>(produtoVazio);
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		async function carregarProduto() {
			const produto = await ProdutoRequests.obterProdutoPorId(Number(id_produto));
			if (produto) {
				setFormData({ ...produto, data_cadastro: produto.data_cadastro ?? '' });
			}
			setCarregando(false);
		}

		carregarProduto();
	}, [id_produto]);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = event.target;
		if (type === 'checkbox') {
			setFormData(prev => ({ ...prev, [name]: (event.target as HTMLInputElement).checked }));
		} else if (['id_categoria', 'preco_unitario', 'quantidade_disponivel', 'quantidade_minima'].includes(name)) {
			setFormData(prev => ({ ...prev, [name]: Number(value) }));
		} else {
			setFormData(prev => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formData.quantidade_minima > formData.quantidade_disponivel) {
			alert('A quantidade mínima não pode ser maior que a quantidade em estoque');
			return;
		}

		const atualizado = await ProdutoRequests.atualizarProduto(Number(id_produto), formData);
		if (atualizado) {
			alert('Produto atualizado com sucesso');
			navigate('/lista/produto');
		} else {
			alert('Erro ao atualizar produto');
		}
	};

	if (carregando) return <main className="product-form-page"><p>Carregando produto...</p></main>;

	return (
		<main className="product-form-page">
			<div className="product-form-container">
				<form onSubmit={handleSubmit} className="product-form">
					<div className="product-form__header">
						<span className="product-form__eyebrow">Painel de Controle</span>
						<h1 className="product-form__title">Atualizar <span>Produto</span></h1>
						<p className="product-form__subtitle">Altere os dados do produto cadastrado.</p>
					</div>
					<div className="product-form__fields">
						<div className="product-form__row product-form__row--wide">
							<div className="product-form__field"><label htmlFor="nome" className="product-form__label">Nome</label><input id="nome" name="nome" required minLength={3} value={formData.nome} onChange={handleChange} className="product-form__input" /></div>
							<div className="product-form__field"><label htmlFor="codigo" className="product-form__label">Código</label><input id="codigo" name="codigo" required value={formData.codigo} onChange={handleChange} className="product-form__input" /></div>
						</div>
						<div className="product-form__row">
							<div className="product-form__field"><label htmlFor="id_categoria" className="product-form__label">Categoria</label><input id="id_categoria" name="id_categoria" type="number" min={1} required value={formData.id_categoria} onChange={handleChange} className="product-form__input" /></div>
							<div className="product-form__field"><label htmlFor="data_cadastro" className="product-form__label">Data de cadastro</label><input id="data_cadastro" name="data_cadastro" type="date" required value={formData.data_cadastro ? String(formData.data_cadastro).slice(0, 10) : ''} onChange={handleChange} className="product-form__input" /></div>
						</div>
						<div className="product-form__field"><label htmlFor="descricao" className="product-form__label">Descrição</label><textarea id="descricao" name="descricao" required minLength={5} rows={4} value={formData.descricao} onChange={handleChange} className="product-form__input product-form__textarea" /></div>
						<div className="product-form__row product-form__row--metrics">
							<div className="product-form__field"><label htmlFor="preco_unitario" className="product-form__label">Preço (R$)</label><input id="preco_unitario" name="preco_unitario" type="number" min={0} step="0.01" required value={formData.preco_unitario} onChange={handleChange} className="product-form__input" /></div>
							<div className="product-form__field"><label htmlFor="quantidade_disponivel" className="product-form__label">Disponível</label><input id="quantidade_disponivel" name="quantidade_disponivel" type="number" min={0} required value={formData.quantidade_disponivel} onChange={handleChange} className="product-form__input" /></div>
							<div className="product-form__field"><label htmlFor="quantidade_minima" className="product-form__label">Qtd. mínima</label><input id="quantidade_minima" name="quantidade_minima" type="number" min={0} required value={formData.quantidade_minima} onChange={handleChange} className="product-form__input" /></div>
						</div>
						<div className="product-form__checkbox-field"><input id="ativo" name="ativo" type="checkbox" checked={formData.ativo} onChange={handleChange} className="product-form__checkbox" /><label htmlFor="ativo" className="product-form__checkbox-label">Produto ativo</label></div>
					</div>
					<div className="product-form__actions"><input type="submit" value="SALVAR ALTERAÇÕES" className="product-form__submit" /><button type="button" onClick={() => navigate('/lista/produto')} className="product-form__cancel">VOLTAR</button></div>
				</form>
			</div>
		</main>
	);
}

export default AtualisarProdutos;
