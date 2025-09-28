import closeButton from './icons/closeButton.svg';

function App() {
  const handleClose = () => {
    window.electronAPI.closeApp();
  };

  return (
    <>
      <div className="flex flex-col h-40 w-200 bg-black/80 rounded-lg backdrop-blur-3xl">
      <nav className="flex justify-between px-4 py-1">
        <div>
          <p className="text-white font-bold">Assignment Cheater 2.0</p>
        </div>
        <div>
          <button onClick={handleClose} className="hover:opacity-45 transition-all cursor-pointer"><img src={closeButton} className="w-5"/></button>
        </div>
      </nav>
      <div className="flex mt-2">
        <div className="flex-1 flex px-4">
          <p className="text-white font-semibold">Drag assignment here</p>
        </div>
        <div className="flex-1 flex px-4">
          <p className="text-white font-semibold">Finished assignment here</p>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
