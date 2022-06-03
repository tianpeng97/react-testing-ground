import { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0) // state hook

  setTimeout(() => setCounter(counter + 1), 1000)
  return <div>{counter}</div>
}

export default App
