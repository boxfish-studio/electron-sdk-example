import { api } from './api'
import './spinner.css'

function App(): JSX.Element {
  const click = async (): Promise<undefined> => {
    const startTime = performance.now()
    const info = await api.createAccount()
    console.log(info)
    const endTime = performance.now()
    console.log(`createAccount ${endTime - startTime} ms`)
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
