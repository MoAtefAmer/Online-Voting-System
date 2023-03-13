

interface PageNumberProps{
    number:number,
    onClick?:()=>void;
}

export function Pagenumber({number,onClick}:PageNumberProps) {
    return (
        <div>
            <li>
                <a href="#" className="px-3 py-2 leading-tight  border 
                 bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                    
                    1
                    
                    </a>
            </li>
        </div>
    )
}
