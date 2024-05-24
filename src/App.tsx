import './App.css';
import { FunctionComponent } from 'react';
import HomeContainer from './pages/home/HomeContainer.tsx';
import { BrowserRouter } from 'react-router-dom';

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <HomeContainer />
    </BrowserRouter>
  );
};

export default App;
