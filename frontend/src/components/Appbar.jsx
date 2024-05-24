export const Appbar = ({label}) => {
    const name=label
    return (
        <div className="pt-4">
            <div className="flex justify-between p-2 md:p-4 border rounded-lg borde-2 m-4 mt-0">
            <div className="text-lg md:text-2xl font-medium">
                PayTM App
            </div>
            <div className="flex justify-center items-center">
                <div className="text-base md:text-lg font-base pr-2">
                    Hello, {label}
                </div>
                <div className="flex justify-center items-center rounded-full bg-slate-300 w-8 h-8">
                    {name[0]}
                </div>
            </div>
        </div>
        </div>
    )
}