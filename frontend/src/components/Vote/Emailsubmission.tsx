
export function Emailsubmission() {
    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-xl text-xl font-medium title-font mb-4 text-white">Please enter your email</h1>

                </div>
                <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4">

                    <div className="relative sm:mb-0 flex-grow w-full">
                        <label className="leading-7 text-sm text-gray-400">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                </div>
            </div>
        </section>
    )
}
