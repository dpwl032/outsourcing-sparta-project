import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Router from './router/Router';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Router />
        {/* <Footer /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
