import { Route, Routes } from 'react-router'
import { HomePage } from './components/HomePage/HomePage';
import { WrongPath } from './components/WrongPath/WrongPath';
import { Classement } from './components/Classement/Classement';
import { Hopitaux } from './components/Hopitaux/Hopitaux';
import { Places } from './components/Places/Places';
import { Preference } from './components/Preference/Preference';
import { Resultat } from './components/Resultat/Resultat';
import { Service } from './components/Service/Service';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Classement" element={<Classement />} />
        <Route path="/Hopitaux" element={<Hopitaux />} />
        <Route path="/Place" element={<Places />} />
        <Route path="/Preference" element={<Preference />} />
        <Route path="/Resultat" element={<Resultat />} />
        <Route path="/Service" element={<Service />} />
        <Route path="*" element={<WrongPath />} />
      </Routes>
    </>
  )
}

export default App;
