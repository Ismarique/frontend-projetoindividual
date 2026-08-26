import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListagemProduto from './components/Listagens/ListagemProduto/ListagemProduto.tsx';
import FormProduto from './components/Formularios/FormProduto/FormProduto';
import BoasVindas from './components/BoasVindas/BoasVindas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<BoasVindas />} />
          <Route path="/lista/produto" element={<ListagemProduto />} />
          <Route path="/cadastro/produto" element={<FormProduto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;