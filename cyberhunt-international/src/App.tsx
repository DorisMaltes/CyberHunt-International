import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPageAndRegisterPage from './pages/LogInPageAndRegisterPage'

import TopDownWorld from './pages/WorldMap'
import HomePage from './pages/HomePage'
import LeaderboardPage from './pages/LeaderboardPage'



//pages:
import LogInPage from './pages/LogInPage'
import Registration from './pages/Registration'





function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPageAndRegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/game" element={<TopDownWorld />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </BrowserRouter>
    )
  }

export default App
