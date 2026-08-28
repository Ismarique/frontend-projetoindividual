import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutoRequests from '../../../fetch/ProdutoRequests';
import type ProdutoDTO from '../../../dto/ProdutoDTO';

const obterDataAtual = () => {
  const data = new Date();
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

function FormProduto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProdutoDTO>({
        id_categoria: undefined,
        data_cadastro: obterDataAtual(),
        nome: '',
        codigo: '',
        descricao: '',
        preco_unitario: 0,
        quantidade_disponivel: 0,
        quantidade_minima: 0,
        ativo: true
    });

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        // Trata campos do tipo checkbox (booleano)
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }

        // Trata campos numéricos
        if (name === 'preco_unitario' || name === 'quantidade_disponivel' || name === 'quantidade_minima' || name === 'id_categoria') {
            setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        // validação simples da quantidade mínima em relação ao estoque
        if (formData.quantidade_minima > formData.quantidade_disponivel) {
            alert("A quantidade mínima não pode ser maior que a quantidade em estoque");
            return;
        }

        // chama o método que irá fazer a requisição à API
        const resposta = await ProdutoRequests.enviarFormularioProduto(formData);
        if (resposta) {
            alert("Produto cadastrado com sucesso");
        } else {
            alert("Erro ao cadastrar produto aaaaaaaaaaaaa");
        }
    };

    return (
  <main className="product-form-page">
    <div className="product-form-container">
      <form 
        onSubmit={handleSubmit} 
        className="product-form"
      >
        <div className="product-form__header">
          <span className="product-form__eyebrow">
            Painel de Controle
          </span>
          <h1 className="product-form__title">
            Cadastro de <span className="text-emerald-400 [text-shadow:0_0_15px_rgba(52,211,153,0.6)]">Produto</span>
          </h1>
          <p className="product-form__subtitle">Preencha os dados para adicionar um produto ao catálogo.</p>
        </div>

        <div className="product-form__fields">
          {/* Linha 1: Nome do Produto e Código */}
          <div className="product-form__row product-form__row--wide">
            <div className="product-form__field">
              <label htmlFor="nome" className="product-form__label">
                Nome do Produto
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                required
                minLength={3}
                onChange={handleChange}
                placeholder="Digite o nome do produto"
                className="product-form__input"
              />
            </div>

            <div className="product-form__field product-form__field--small">
              <label htmlFor="codigo" className="product-form__label">
                Código do Produto
              </label>
              <input
                type="text"
                name="codigo"
                id="codigo"
                required
                onChange={handleChange}
                placeholder="Digite o codigo do produto"
                className="product-form__input"
              />
            </div>
          </div>

          {/* Linha 2: Categoria e data de cadastro */}
          <div className="product-form__row">
            <div className="product-form__field">
              <label htmlFor="id_categoria" className="product-form__label">
                Categoria
              </label>
              <input
                type="number"
                name="id_categoria"
                id="id_categoria"
                min={1}
                onChange={handleChange}
                placeholder="ID da categoria"
                className="product-form__input"
              />
            </div>

            <div className="product-form__field">
              <label htmlFor="data_cadastro" className="product-form__label">
                Data de cadastro
              </label>
              <input
                type="date"
                name="data_cadastro"
                id="data_cadastro"
                required
                value={formData.data_cadastro ?? ''}
                onChange={handleChange}
                className="product-form__input"
              />
            </div>
          </div>

          <div className="product-form__field">
            <label htmlFor="descricao" className="product-form__label">
              Descrição
            </label>
            <textarea
              name="descricao"
              id="descricao"
              required
              minLength={5}
              rows={4}
              onChange={(event) => setFormData(prev => ({ ...prev, descricao: event.target.value }))}
              placeholder="Descreva as características do produto"
              className="product-form__input product-form__textarea"
            />
          </div>

          {/* Linha 3: Preço, Estoque e Quantidade Mínima */}
          <div className="product-form__row product-form__row--metrics">
            <div className="product-form__field">
              <label htmlFor="preco_unitario" className="product-form__label">
                Preço (R$)
              </label>
              <input
                type="number"
                name="preco_unitario"
                id="preco_unitario"
                required
                min={0}
                step="0.01"
                onChange={handleChange}
                placeholder="0,00"
                className="product-form__input"
              />
            </div>

            <div className="product-form__field">
              <label htmlFor="quantidade_disponivel" className="product-form__label">
                Quantidade disponível
              </label>
              <input
                type="number"
                name="quantidade_disponivel"
                id="quantidade_disponivel"
                required
                min={0}
                onChange={handleChange}
                placeholder="0"
                className="product-form__input"
              />
            </div>

            <div className="product-form__field">
              <label htmlFor="quantidade_minima" className="product-form__label">
                Qtd. Mínima
              </label>
              <input
                type="number"
                name="quantidade_minima"
                id="quantidade_minima"
                required
                min={0}
                onChange={handleChange}
                placeholder="0"
                className="product-form__input"
              />
            </div>
          </div>

          {/* Checkbox Ativo */}
          <div className="product-form__checkbox-field">
            <input
              type="checkbox"
              name="ativo"
              id="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              className="product-form__checkbox"
            />
            <label htmlFor="ativo" className="product-form__checkbox-label">
              Produto ativo
            </label>
          </div>
        </div>

        {/* Botões */}
        <div className="product-form__actions">
          <input
            type="submit"
            value="CADASTRAR PRODUTO"
            className="product-form__submit"
          />
          <button
            type="button"
            onClick={() => navigate('/lista/produto')}
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

export default FormProduto;