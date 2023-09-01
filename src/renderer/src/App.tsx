import { api } from './api'
import './spinner.css'

function App(): JSX.Element {
  const click = async (): Promise<undefined> => {
    const info = await api.getNodeInfo('http://localhost:14265')
    console.log(info)
  }
  return (
    <div className="container">
      <h1> hello </h1>
      <button onClick={click}> btn </button>
      <div className="spinner" />
    </div>
  )
}

export default App
