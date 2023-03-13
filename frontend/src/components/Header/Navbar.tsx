
import { Logo } from './Logo'

export function Navbar() {
    return (
        <header className="text-gray-400 bg-gray-900 body-font relative right-4">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                <nav className="md:ml-auto md:mr-auto flex  flex-wrap items-center text-base justify-center">
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <Logo />

                        <span className="ml-3 text-3xl">Pollster</span>
                    </a>
                </nav>

            </div>
        </header>
    )
}
