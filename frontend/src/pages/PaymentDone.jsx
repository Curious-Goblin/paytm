export default function PayementDone() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <div className="w-3/12 h-7/12 bg-white rounded-lg border border-2 pt-20 pb-20">
                <div className="flex justify-center items-center">
                <div className="flex justify-center items-center mb-4 bg-green-500 p-2 w-12 h-12 rounded-full">
                    <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                </div>
                <div className="flex justify-center items-center font-medium text-xl">
                    Payment Done!
                </div>
            </div>
        </div>
    )
}