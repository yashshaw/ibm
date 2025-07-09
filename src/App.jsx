import {Headervalues} from './components/Headervalues'
import { Changeallocation } from './components/Changeallocation'
import './App.css'
import { Allocations } from './components/Allocations'
import { Mystates } from './hooks/Mystates'

function App() {

  return (
    <>
    <Mystates>
      <Headervalues  />
      <Allocations />
      <Changeallocation  />
    </Mystates>

    </>
  )
}

export default App
