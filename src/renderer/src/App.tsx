import { api } from './api'
import './spinner.css'

function App(): JSX.Element {
  const click = async (): Promise<undefined> => {
    const info = await api.getNodeInfo('http://localhost:14265')
    console.log(info)
  }
  return (
    <div className="container">
      <h3> Node info will be logged to the console </h3>
      <button onClick={click}> node info </button>
      <h3> Spinner to check if the app stays responsive </h3>
      <div className="spinner" />
    </div>
  )
}

export default App
