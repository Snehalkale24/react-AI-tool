import './App.css'

function App() {
  return (
    <div className='grid grid-cols-5 h-screen text-center'>
      
      {/* Sidebar */}
      <div className='bg-zinc-800 p-2 text-white'>hee</div>
      
      {/* Main Content */}
      <div className='col-span-4'>
        <div className='container h-150'>
        </div>

        <div className='bg-zinc-800 w-1/2 text-white m-auto rounded-2xl border-zinc-300 border p-1 flex'>
          <input type="text" className="w-full h-full p-3 outline-none"    placeholder='Ask me Anything' />
          <button>Ask</button>
        </div>
      </div>

    </div>
  )
}

export default App
