
import './App.css';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import AddContact from './containers/Home/AddContact/AddContact.tsx';


const App = () => (
    <>
<Layout>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<AddContact />} />
    {/*<Route path={`/show/:${id}`} element={<FilmInfo />} />*/}
    <Route path="*" element={<h1>Not found</h1>} />
  </Routes>
</Layout>
    </>
);

export default App;
