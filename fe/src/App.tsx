import { Button } from "@/components/ui/button"
import { useState } from "react"
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <p className="text-red-500"> Hello, Shadcn</p>
      <p>{count}</p>
      <Button onClick={() => setCount((prev: number) => prev + 1)}> Click Me</Button>
    </>
  )
}

export default App
