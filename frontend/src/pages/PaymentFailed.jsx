export default function PaymentFailed() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200">
            <div className="lg:w-3/12 h-7/12 bg-white rounded-lg border border-2 pt-20 pb-20">
                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center mb-4 bg-red-500 p-2 w-12 h-12 rounded-full">
                        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center items-center font-medium text-xl p-8">
                    Payment failed!
                </div>
                <div className="flex justify-center items-center font-medium text-xl p-8">
                    You don't have enough balance to make this transaction
                </div>
            </div>
        </div>
    )
}