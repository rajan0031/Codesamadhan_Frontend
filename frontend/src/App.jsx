import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import DocumentUpload from './Components/CreateFile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DocumentUpload />
    </>
  )
}

export default App
