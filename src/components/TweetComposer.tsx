// 사용하지 않음
// 'use client'

// import { useState } from 'react'
// import { FaImage, FaGift, FaPoll, FaSmile } from 'react-icons/fa'

// export default function TweetComposer() {
//   const [tweet, setTweet] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Submitted tweet:', tweet)
//     setTweet('')
//   }

//   return (
//     <form onSubmit={handleSubmit} className="border-b border-gray-800 p-4">
//       <textarea
//         className="w-full bg-transparent resize-none focus:outline-none text-xl text-gray-100 placeholder-gray-500 mb-3"
//         placeholder="무슨 일이 일어나고 있나요?22"
//         value={tweet}
//         onChange={(e) => setTweet(e.target.value)}
//         rows={3}
//       />
//       <div className="flex justify-between items-center">
//         <div className="flex space-x-2 text-green-500">
//           <button type="button" className="hover:bg-gray-800 p-2 rounded-full transition duration-200"><FaImage /></button>
//           <button type="button" className="hover:bg-gray-800 p-2 rounded-full transition duration-200"><FaGift /></button>
//           <button type="button" className="hover:bg-gray-800 p-2 rounded-full transition duration-200"><FaPoll /></button>
//           <button type="button" className="hover:bg-gray-800 p-2 rounded-full transition duration-200"><FaSmile /></button>
//         </div>
//         <button 
//           type="submit" 
//           className="bg-green-500 text-white px-4 py-2 rounded-full font-bold disabled:opacity-50 hover:bg-green-600 transition duration-200"
//           disabled={tweet.trim().length === 0}
//         >
//           게시하기
//         </button>
//       </div>
//     </form>
//   )
// }