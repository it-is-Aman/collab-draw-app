import { ReactNode } from "react"

interface layoutProps {
    icon: ReactNode,
    onclick: () => void,
    activated: boolean
}

export default function LayoutIcon({ icon, onclick, activated }: layoutProps) {

    return (
        <div
            className={`
                p-2 rounded-full cursor-pointer transition-all duration-200
                ${activated
                    ? "bg-blue-600 text-white shadow-lg scale-110"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }
            `}
            onClick={onclick}
        >
            {icon}
        </div>
    )
}
