import './App.scss';
import { BrowserRouter} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import Routers from './routes/Routers';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routers/>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
