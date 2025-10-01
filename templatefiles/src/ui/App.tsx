import closeButton from './icons/closeButton.svg';
import fullSize from './icons/fullsize.svg';
import minimize from './icons/minimize.svg';

function App() {
  const onClose = () => {
    window.electron.onClose();
  }

  const onSetfull = () => {
    window.electron.onFullScreen();
  }

  const onMinimize = () => {
    window.electron.onMinimize();
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-white rounded-xl backdrop-blur-3xl">
        <nav className='h-12 items-center navbar px-4 bg-[#0F203E] flex justify-between'>
          <div>
            <h1 className='text-white font-semibold'>ElectronTemplate</h1>
          </div>
          <div className='flex noDrag gap-4'>
            <button onClick={onMinimize} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><img src={minimize} className='w-5'/></button>
            <button onClick={onSetfull} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><img src={fullSize} className='w-5'/></button>
            <button onClick={onClose} className='cursor-pointer items-center justify-center hover:opacity-55 transition-all'><img src={closeButton} className='w-4'/></button>
          </div>
        </nav>
        <div className='h-full bg-[#0A192F] '>
          
        </div>
      </div>
    </>
  )
}

export default App
