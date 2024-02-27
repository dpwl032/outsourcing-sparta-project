import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AddBusinessInfo from '../pages/RegisterBusinessInfo.jsx'
import WriteReview from '../pages/WriteReview.jsx'
import DetailInfoPage from '../pages/DetailInfoPage.jsx';
import BusinessList from '../pages/BusinessList.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/RegisteringInfo' element={<AddBusinessInfo />} />
      <Route path='/WritingReview' element={<WriteReview />} />
      <Route path='/List' element={<BusinessList />} />
      <Route path='/Details/:id' element={<DetailInfoPage/>} />
    </Routes>
  );
};

export default Router;
