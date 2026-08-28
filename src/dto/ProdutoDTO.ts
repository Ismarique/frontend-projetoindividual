export default interface ProdutoDTO {
  id_produto?: number;
  id_categoria?: number;
  data_cadastro?: string;
  nome: string;
  codigo: string;
  descricao: string;
  preco_unitario: number;
  quantidade_disponivel: number;
  quantidade_minima: number;
  ativo: boolean;
}