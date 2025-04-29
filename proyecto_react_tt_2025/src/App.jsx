import { Trash } from 'lucide-react'
import Swal from 'sweetalert2'
import Button from './componentes/Button'
import './App.css'

function App() {
  const handleClick = () => {
          Swal.fire({
            title: 'Botón presionado',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        };

  return (
    <>
      <Button
      texto="Eliminar" 
      Icono={Trash} 
      onClick={handleClick} 
      tooltip="Borrar elemento"
      ></Button>
    </>
  )
}

export default App
