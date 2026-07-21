import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { site, logoSrc } from './data/content';

import HomePage from './pages/HomePage';
import SubcontractorPage from './pages/SubcontractorPage';

/**
 * Hachlaf Akhawayne website router.
 *
 * Routes:
 * - /           -> marketing homepage
 * - /sous-traitant -> subcontractor application page with embedded Typeform
 */
function App() {
  const [lang, setLang] = useState('fr');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage lang={lang} setLang={setLang} />}
          />
          <Route
            path="/sous-traitant"
            element={
              <SubcontractorPage
                content={site[lang]}
                logoSrc={logoSrc}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}

export default App;
