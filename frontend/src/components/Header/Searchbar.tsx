

export function Searchbar() {
    return (
        <div >
            <form>
                <label form="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative flex m-2 items-center justify-center">
                    <div className="relative  left-7 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" className="block w-1/2 p-4 pl-10 text-sm 
                     border  rounded-lg 
                      bg-gray-700 
                    border-gray-600 placeholder-gray-400 
                    text-white focus:ring-blue-500 
                    focus:border-blue-500" placeholder="Search Polls, Titles, Choices..." required />



                    <button type="submit" className="text-white relative md:right-20 right-16  focus:ring-4 focus:outline-none 
                         font-medium rounded-lg
                            px-2 py-2
                         text-sm md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>
                </div>
            </form>

        </div>
    )
}
