import { useEffect, useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriaRequests from '../../../fetch/CategoriaRequests';
import type { CategoriaDTO } from '../../../dto/CategoriaDTO';

function AtualisarCategorias(): JSX.Element {
    const { id_categoria } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CategoriaDTO>({ nome: '' });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarCategoria() {
            const categoria = await CategoriaRequests.obterCategoriaPorId(Number(id_categoria));
            if (categoria) setFormData(categoria);
            setCarregando(false);
        }

        carregarCategoria();
    }, [id_categoria]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, nome: event.target.value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const atualizado = await CategoriaRequests.atualizarCategoria(Number(id_categoria), formData);
        if (atualizado) {
            alert('Categoria atualizada com sucesso');
            navigate('/lista/categoria');
        } else {
            alert('Erro ao atualizar categoria');
        }
    };

    if (carregando) return <main className="product-form-page"><p>Carregando categoria...</p></main>;

    return (
        <main className="product-form-page">
            <div className="product-form-container">
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="product-form__header">
                        <span className="product-form__eyebrow">Painel de Controle</span>
                        <h1 className="product-form__title">Atualizar <span>Categoria</span></h1>
                        <p className="product-form__subtitle">Altere o nome da categoria cadastrada.</p>
                    </div>
                    <div className="product-form__fields">
                        <div className="product-form__field">
                            <label htmlFor="nome" className="product-form__label">Nome da categoria</label>
                            <input id="nome" name="nome" type="text" required minLength={3} value={formData.nome} onChange={handleChange} className="product-form__input" />
                        </div>
                    </div>
                    <div className="product-form__actions">
                        <input type="submit" value="SALVAR ALTERAÇÕES" className="product-form__submit" />
                        <button type="button" onClick={() => navigate('/lista/categoria')} className="product-form__cancel">VOLTAR</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default AtualisarCategorias;
