import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
  );
};

export default Router;
