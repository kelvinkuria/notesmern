import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
//import toast from "react-hot-toast"


const App = () => {
  return <div className="relative h-full w-full">
<div className="absolute inset-0 -z-10 h-full w-full bg-base-200 [background:radial-gradient(120%_120%_at_50%_20%,#E5E9F0_60%,#D8DEE9_100%)]" />



<Routes>
< Route  path="/" element={<HomePage />}/>
<Route  path="/create" element={<CreatePage />} />
<Route  path="/note/:id" element={<NoteDetailPage />} />

</Routes>


  </div>
  
}

export default App