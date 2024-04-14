export const Button = ({label, onClick}) => {
    return (
        <button type="button" onClick={onClick} className=" pl-4 pr-4 p-2 w-full rounded-full text-white bg-gray-800 font-medium rounded-lg text-sm">
            {label}
        </button>
    )
}