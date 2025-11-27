import { useEffect, useRef } from 'react'
// import inDraw from '../draw/inDraw'
import { Circle, RectangleHorizontalIcon } from 'lucide-react'
import LayoutIcon from './LayoutIcon'
import { useState } from 'react'
import { Game } from '../draw/Game'

export type Tools = "circle" | "rectangle"

function CanvasPage({ socket, id }: { socket: WebSocket, id: number }) {
    // Reference to the canvas DOM element
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // State for tracking which drawing tool is currently selected
    const [selectTool, setSelectTool] = useState<Tools>("rectangle")

    // State to store the Game instance
    const [game, setGame] = useState<Game>()

    // Commented code shows an alternative approach (method 1)
    // useEffect(() => {
    //     // @ts-ignore
    //     window.selectTool = selectTool
    // }, [selectTool])
    // useEffect(() => {
    //     if (canvasRef.current) {
    //         inDraw(canvasRef.current, socket, id)
    //     }
    // }, [canvasRef, socket, id, selectTool])


    // Initialize the Game instance once when component mounts
    useEffect(() => {
        if (canvasRef.current) {
            // Create a new Game instance with the canvas, socket, and room ID
            const g = new Game(canvasRef.current, socket, id)
            setGame(g)

            // Clean up by destroying the Game instance when component unmounts
            return () => { g.destroy() }
        }
    }, [canvasRef, socket, id])

    // Update the selected tool in the Game instance whenever it changes
    useEffect(() => {
        game?.Tools(selectTool)
    }, [game, selectTool])

    return (
        <div className='relative min-h-screen w-full bg-gray-100 overflow-hidden'>
            {/* Canvas element with fixed dimensions */}
            <canvas
                className='bg-white shadow-sm'
                ref={canvasRef}
                height={1990}
                width={1990}
            ></canvas>

            {/* Drawing tool selection UI positioned at top-center */}
            <div className='fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 bg-gray-900/90 backdrop-blur-sm text-white rounded-full shadow-xl border border-gray-700 transition-all hover:scale-105'>
                {/* Rectangle tool button */}
                <LayoutIcon
                    icon={<RectangleHorizontalIcon className="w-5 h-5" />}
                    onclick={() => setSelectTool("rectangle")}
                    activated={selectTool === "rectangle"}
                />
                {/* Circle tool button */}
                <LayoutIcon
                    icon={<Circle className="w-5 h-5" />}
                    onclick={() => setSelectTool("circle")}
                    activated={selectTool === "circle"}
                />
            </div>
        </div>
    )
}

export default CanvasPage