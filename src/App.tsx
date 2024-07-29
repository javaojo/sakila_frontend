
import Navbar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {Home,Actors,Films} from "./pages";
import '@/assets/css/App.css'
import FilmDetails from "./components/FilmDetails.tsx";
import ActorDetails from "./components/ActorDetails.tsx";
import ActorForm from "./components/ActorForm.tsx";


function App() {

    return (
      <div className="App">
          <Navbar/>
          <Routes>
              {/*defines the link to webpages*/}
              <Route path="/" element={<Home/>}></Route>
              <Route path="/actors" element={<Actors/>}></Route>
              <Route path="/films" element={<Films/>}></Route>
              <Route path="/films/:id" element={<FilmDetails />} />
              <Route path="/actors/:id" element={<ActorDetails />}/>
              <Route path="/add-actor" element={<ActorForm />} />
          </Routes>
          <div className="container">
              <div className="top"></div>
              <div className="bottom"></div>
          </div>

      </div>
  )
}

export default App
