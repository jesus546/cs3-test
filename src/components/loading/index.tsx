import React from 'react'

const Skeleton = () => {
    return (
        <div>
            {[...Array(5)].map((e, i: number) => (
                <div key={i} className="animate-pulse w-full flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-8 w-8"></div>
                    <div className="flex-1 items-center pt-4 w-full">
                        <div className="h-2 bg-slate-200 w-full rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Skeleton