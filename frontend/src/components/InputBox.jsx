export const InputBox = ({ label, placeholder, onChange,value }) => {
    return (
        <div className="w-full">
            <div className="font-base text-left text-lg">
                {label}
            </div>
            <input onChange={onChange} value={value}
                className="pr-4 p-2 mt-2 mb-2 text-base w-full text-left border rounded border-slate-200"
                placeholder={placeholder} />
        </div>
    )
}