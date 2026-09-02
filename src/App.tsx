import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormProduto from './components/Formularios/FormProduto/FormProduto';
import BoasVindas from './components/BoasVindas/BoasVindas';
import PDetalhesProduto from './pages/PDetalhes/PDetalhesProduto/PDetalhesProduto';
import PListagemProduto from './pages/PListagem/PListagemProduto/PListagemProduto';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/lista/produto" element={<PListagemProduto />} />
          <Route path="/cadastro/produto" element={<FormProduto />} />
          <Route path="/detalhes/produto/:id_produto" element={<PDetalhesProduto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;