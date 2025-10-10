import './App.css'
import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([]) 

  const askQuestion = async (q = question) => {
    const query = q.trim()
    if (!query) {
      setAnswer("⚠️ Please enter a question.")
      return
    }

    setRecentSearches(prev => {
      const newList = [query, ...prev.filter(item => item !== query)]
      return newList.slice(0, 5) 
    })

    const payload = {
      contents: [
        {
          parts: [
            { text: query }
          ]
        }
      ]
    }

    console.log("📤 Sending payload:", payload)

    try {
      setLoading(true)
      setAnswer("")

      let response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyALVBjsZOQm5ysZOaE_sC7NkwVTM1lJ5tA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await response.json()
      console.log("✅ Parsed Response JSON:", data)

      if (data.candidates && data.candidates.length > 0) {
        const firstCandidate = data.candidates[0]
        if (firstCandidate.content?.parts?.[0]?.text) {
          setAnswer(firstCandidate.content.parts[0].text)
        } else {
          setAnswer("⚠️ No text found in response.")
        }
      } else {
        setAnswer("⚠️ No candidates found.")
      }

    } catch (err) {
      console.error("❌ Network/Fetch Error:", err)
      setAnswer("❌ Something went wrong while fetching answer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='grid grid-cols-5 h-screen text-center bg-zinc-900 text-white'>
      
      <div className='bg-zinc-800 p-4 flex flex-col items-start'>
        <h3 className='font-bold mb-2'>Recent Searches</h3>
        <ul className='space-y-2 w-full'>
          {recentSearches.map((item, index) => (
            <li 
              key={index} 
              className='cursor-pointer hover:text-blue-400'
              onClick={() => askQuestion(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div className='col-span-4 flex flex-col items-center justify-start p-6'>
        <div className='font-bold text-pink-400 text-4xl p-4'>Hello User,Ask me Anything</div>
    
        
  
        {answer && (
          <div className="bg-zinc-800 text-white w-full max-w-2xl p-4 mb-6 rounded-xl shadow text-left">
            <h2 className="font-bold text-lg mb-2">Answer:</h2>
            <p className="whitespace-pre-line">{answer}</p>
          </div>
        )}

       
        <div className='bg-zinc-800 w-full max-w-2xl rounded-2xl border border-zinc-600 p-1 flex'>
          <input 
            type="text" 
            value={question} 
            onChange={(event)=>setQuestion(event.target.value)} 
            className="w-full p-3 bg-transparent outline-none text-white"    
            placeholder='Ask me Anything' 
          />
          <button 
            onClick={() => askQuestion()} 
            disabled={loading}
            className="px-4 py-2 bg-blue-500 rounded-lg ml-2 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
