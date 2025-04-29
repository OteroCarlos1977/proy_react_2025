import { Trash } from 'lucide-react'
import Button from './componentes/Button'
import './App.css'

function App() {
  

  return (
    <>
      <Button
      texto="Eliminar" 
      Icono={Trash} 
      onClick={() => alert("Eliminado")} 
      tooltip="Borrar elemento"
      ></Button>
    </>
  )
}

export default App
