import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './components/Rotas/ProtectedRoutes';
import FormProduto from './components/Formularios/FormProduto/FormProduto';
import BoasVindas from './components/BoasVindas/BoasVindas';
import PDetalhesProduto from './pages/PDetalhes/PDetalhesProduto/PDetalhesProduto';
import PListagemProduto from './pages/PListagem/PListagemProduto/PListagemProduto';
import PListagemCategoria from './pages/PListagem/PListagemCategoria/PListagemCategoria';
import PCadastroCategoria from './pages/PCadastro/PCadastroCategoria/PCadastroCategoria';
import PAtualisarProdutos from './components/Atualisar/AtualisarProdutos/AtualisarProdutos';
import PAtualisarCategorias from './components/Atualisar/AtualisarCategorias/AtualisarCategorias';
import PListagemMovimentacao from './pages/PListagem/PListagemMovimentacao/PListagemMovimentacao';
import PDetalhesMovimentacao from './pages/PDetalhes/PDetalhesMovimentacao/PDetalhesMovimentacao';
import PCadastroMovimentacao from './pages/PCadastro/PCadastroMovimentacao/PCadastroMovimentacao';
// import PLogin from './pages/PLogin/PLogin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          {/* <Route path='/login' element={<PLogin />}/> */}
          <Route path="/lista/produto" element={<PListagemProduto />} />
          <Route path="/lista/categoria" element={<PListagemCategoria />} />
          <Route path="/lista/movimentacao" element={<PListagemMovimentacao />} />
          <Route path="/cadastro/produto" element={<FormProduto />} />
          <Route path="/cadastro/categoria" element={<PCadastroCategoria />} />
          <Route path="/cadastro/movimentacao" element={<PCadastroMovimentacao />} />
          <Route path="/atualizar/produto/:id_produto" element={<PAtualisarProdutos />} />
          <Route path="/atualizar/categoria/:id_categoria" element={<PAtualisarCategorias />} />
          <Route path="/detalhes/produto/:id_produto" element={<PDetalhesProduto />} />
          <Route path="/detalhes/movimentacao/:id_movimentacao" element={<PDetalhesMovimentacao />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;