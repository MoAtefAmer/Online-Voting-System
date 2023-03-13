import { Leftnavbutton } from "./Leftnavbutton"
import { Pagenumber } from "./Pagenumber"
import { Rightnavbutton } from "./Rightnavbutton"


export function Paginator() {
    return (
        <div className="container mx-auto flex justify-center flex-wrap p-5 flex-col md:flex-row  items-center">

            <nav aria-label="Page navigation example">
                <ul className="inline-flex  -space-x-px">
                    <Leftnavbutton />

                    <Pagenumber number={1}  />


                    <Rightnavbutton />
                </ul>
            </nav>


        </div>
    )
}
