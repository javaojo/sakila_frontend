import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from "./components/GlobalComponent/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {Home,Actors,Films} from "./pages";
import '@/assets/css/App.css'
import FilmDetails from "./components/FilmComponent/FilmDetails.tsx";
import ActorDetails from "./components/ActorComponent/ActorDetails.tsx";
import ActorForm from "./components/ActorComponent/ActorForm.tsx";
import UpdateActor from "./components/ActorComponent/UpdateActor.tsx";


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
              <Route path="/actors/:id/update" element={<UpdateActor />} />
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
