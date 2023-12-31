import React from "react";

interface InModal {
  showModal: boolean
  setShowModal: (value: boolean) => void,
  children: React.JSX.Element,
  header: React.JSX.Element | string | number
}


const Modal: React.FC<InModal> = ({ showModal, setShowModal, header, children }) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className=" w-full max-w-md max-h-full">
              {/*content*/}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {header}
                  </h3>
                  <button onClick={() => setShowModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                </div>
                {/*body*/}
                <div className="p-3 space-y-6">
                  {children}
                </div>
             
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default Modal
