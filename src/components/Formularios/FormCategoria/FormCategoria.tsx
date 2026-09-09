import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent, ChangeEvent } from 'react';
import CategoriaRequests from '../../../fetch/CategoriaRequests';
import type { CategoriaDTO } from '../../../dto/CategoriaDTO';

function FormCategoria() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<CategoriaDTO>({
		nome: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const resposta = await CategoriaRequests.enviarFormularioCategoria(formData);
		if (resposta) {
			alert('Categoria cadastrada com sucesso');
			setFormData({ nome: '' });
		} else {
			alert('Erro ao cadastrar categoria');
		}
	};

	return (
		<main className="product-form-page">
			<div className="product-form-container">
				<form onSubmit={handleSubmit} className="product-form">
					<div className="product-form__header">
						<span className="product-form__eyebrow">Painel de Controle</span>
						<h1 className="product-form__title">
							Cadastro de <span>Categoria</span>
						</h1>
						<p className="product-form__subtitle">
							Preencha os dados para adicionar uma categoria ao catálogo.
						</p>
					</div>

					<div className="product-form__fields">
						<div className="product-form__field">
							<label htmlFor="nome" className="product-form__label">
								Nome da Categoria
							</label>
							<input
								type="text"
								name="nome"
								id="nome"
								required
								minLength={3}
								value={formData.nome}
								onChange={handleChange}
								placeholder="Digite o nome da categoria"
								className="product-form__input"
							/>
						</div>
					</div>

					<div className="product-form__actions">
						<input
							type="submit"
							value="CADASTRAR CATEGORIA"
							className="product-form__submit"
						/>
						<button
							type="button"
							onClick={() => navigate('/lista/categoria')}
							className="product-form__cancel"
						>
							VOLTAR PARA LISTAGEM
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}

export default FormCategoria;
