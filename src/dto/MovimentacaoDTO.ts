export interface MovimentacaoDTO {
  id_movimentacao?: number; 
  id_produto: number; 
  id_movimentacao_origem?: number; 
  tipo: string; 
  motivo: string; 
  quantidade: number; 
  preco_unitario_praticado?: number;
  valor_total?: number; 
  observacao: string; 
  data_movimentacao?: Date; 
}