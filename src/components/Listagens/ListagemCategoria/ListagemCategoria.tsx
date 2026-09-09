import { useEffect, useState, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoriaRequests from '../../../fetch/CategoriaRequests';
import type { CategoriaDTO } from '../../../dto/CategoriaDTO';

function ListagemCategorias(): JSX.Element {
	const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const navigate = useNavigate();

	useEffect(() => {
		const buscarCategorias = async () => {
			try {
				const listaDeCategorias = await CategoriaRequests.obterListaDeCategorias();
				setCategorias(listaDeCategorias ?? []);
			} catch (error) {
				console.error(`Erro ao buscar categorias. ${error}`);
			}
		};

		buscarCategorias();
	}, []);

	const totalPages = Math.ceil(categorias.length / rowsPerPage) || 1;
	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const currentCategorias = categorias.slice(indexOfFirstRow, indexOfLastRow);

	return (
		<div className="product-list w-full flex flex-col gap-6">
			<div className="product-list__toolbar">
				<div>
					<p className="product-list__eyebrow">Catálogo</p>
					<h1 className="product-list__title">Categorias cadastradas</h1>
					<p className="product-list__subtitle">Consulte as categorias disponíveis no catálogo.</p>
				</div>
				<Link to="/cadastro/categoria" className="product-list__create">
					<i className="pi pi-plus text-sm"></i>
					Nova Categoria
				</Link>
			</div>

			<div className="product-list__card w-full bg-zinc-900/80 border border-emerald-500/20 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden">
				<div className="product-table__scroll overflow-x-auto">
					<table className="product-table w-full text-left text-sm text-zinc-300">
						<thead className="bg-emerald-950/60 text-emerald-400 font-mono text-xs uppercase tracking-wider border-b border-emerald-500/30">
							<tr>
								<th className="py-3.5 px-4">ID</th>
								<th className="py-3.5 px-4">Nome</th>
								<th className="py-3.5 px-4 text-center">Ações</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-800">
							{currentCategorias.length > 0 ? (
								currentCategorias.map((categoria) => (
									<tr key={categoria.id_categoria} className="hover:bg-emerald-950/20 transition-colors">
										<td className="py-3.5 px-4 text-zinc-500 font-mono text-xs">
											{categoria.id_categoria}
										</td>
										<td className="py-3.5 px-4 font-semibold text-zinc-100">
											{categoria.nome}
										</td>
										<td className="py-3.5 px-4 text-center">
											<button
												onClick={() => navigate(`/atualizar/categoria/${categoria.id_categoria}`)}
												className="product-table__details"
											>
												Atualizar
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
										<td colSpan={3} className="product-table__empty">
										Nenhuma categoria cadastrada.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<div className="product-list__pagination">
					<p>
						Mostrando <strong>{categorias.length > 0 ? indexOfFirstRow + 1 : 0}</strong> até{' '}
						<strong>{Math.min(indexOfLastRow, categorias.length)}</strong> de{' '}
						<strong>{categorias.length}</strong> categorias
					</p>

					<div className="flex items-center gap-1">
						<button
							onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
							className="product-list__page-button"
						>
							<i className="pi pi-chevron-left"></i>
						</button>
						{[...Array(totalPages)].map((_, index) => (
							<button
								key={index + 1}
								onClick={() => setCurrentPage(index + 1)}
								className={`product-list__page-button ${currentPage === index + 1 ? 'is-active' : ''}`}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
							disabled={currentPage === totalPages}
							className="product-list__page-button"
						>
							<i className="pi pi-chevron-right"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListagemCategorias;
