import { Choicecard } from "./Choicecard";


export function PollComponent() {
    return (
        <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-green-500   sm:py-0.5 w-1/2  text-center rounded-full">InProgress</span>
                <span className="mt-1 text-gray-500 text-sm relative top-2 left-6">12 Jun 2019</span>
            </div>
            <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-white title-font mb-2">Presidential Poll</h2>
                <p className="leading-relaxed">This poll is about who was/is the best president of egypt</p>
                <div className="flex flex-wrap">
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
                    <div className="w-1/2 md:w-1/3 lg:w-1/4 p-4"><Choicecard/></div>
        
                </div>
            </div>
        </div>
    )
}
