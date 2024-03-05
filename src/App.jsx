import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  //useref hook
  const  refVar = useRef(null)

  const passwordGeneratror = useCallback(()=>{
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      string = string + "012346789"
    }
    if(charAllowed){
      string = string + "!@#$$%^&*()_~"
    }

    for(let i = 1 ; i <= length ; i++){
       let char = Math.floor(Math.random()* string.length + 1)
       pass += string.charAt(char)
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    refVar.current?.select()
    refVar.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGeneratror()},[length,numberAllowed,charAllowed,passwordGeneratror])

  useRef


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-10 px-4  py-4 text-orange-500 bg-gray-700'>
       <h1 className='text-white text-center my-4'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={refVar}
          />
          <button
          onClick={copyPassword}
           className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 flex'
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 ">
             <input 
              type="range" 
              min={0}
              max={100}
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label htmlFor="">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 ">
             <input 
              type="checkbox" 
              id='numberInput'
              defaultChecked={numberAllowed}
              onChange={()=>{setNumberAllowed((prev)=>!prev)}}
              />
              <label htmlFor='numberInput'>Number</label>
          </div>
          <div className="flex items-center gap-x-1 ">
             <input 
              type="checkbox" 
              id='charInput'
              defaultChecked={charAllowed}
              onChange={()=>{setCharAllowed((prev)=>!prev)}}
              />
              <label htmlFor='charInput'>Character</label>
          </div>

        </div>
     </div>
    </>
  )
}

export default App
