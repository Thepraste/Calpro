import { CalendarDays, Clock3 } from "lucide-react"
import SectionHeading from "./SectionHeading"

const programmes = [
  {
    id: 1,
    title: "Carnival Calabar Highlights",
    time: "10:00 AM – 11:00 AM",
    status: "ON NOW",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0PvwxYMQ3FTagZK7fjeHDmOLdECAWO_am0-wcGQNYYw&s=10",
  },
  {
    id: 2,
    title: "The Calabar Story",
    time: "11:00 AM – 12:00 PM",
    status: "NEXT",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwEZqLI4VnONp45RAVD_Pw8MBIgteNPzMEJCuS-sYLcg&s=10",
  },
  {
    id: 3,
    title: "Heritage & Culture",
    time: "12:00 PM – 1:00 PM",
    status: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_ZPzAg7-Na3mPPI7g_KiASJwGlOAZToTlngtqJxdaw&s=10",
  },
  {
    id: 4,
    title: "African Rhythms (Music Special)",
    time: "1:00 PM – 2:00 PM",
    status: "",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv5xY7a00ahMnewTsFIGQLgNNxg5fqhh3_3yu1yOm7Hw&s=10",
  },
]

function ProgrammeSchedule() {
  return (
    <section id="schedule" className="bg-[#090909] py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <SectionHeading
          icon={<CalendarDays size={27} />}
          action={
            <a href="#schedule" className="text-sm font-bold text-[#FFC400] transition hover:text-yellow-200">
              View Full Schedule →
            </a>
          }
        >
          Programme Schedule
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {programmes.map((programme) => (
            <article
              key={programme.id}
              className={`overflow-hidden rounded-xl border bg-[#151515] transition hover:-translate-y-1 hover:border-[#FFC400]/70 ${
                programme.status === "ON NOW" ? "border-[#FFC400] shadow-[0_0_0_1px_#FFC400]" : "border-white/10"
              }`}
            >
              <img src={programme.image} alt="" className="h-28 w-full object-cover sm:h-32" />
              <div className={`min-h-[132px] p-4 ${programme.status === "ON NOW" ? "bg-[#493500]" : ""}`}>
                {programme.status && (
                  <span className={`mb-2 inline-block rounded px-2 py-1 text-[11px] font-extrabold text-white ${
                    programme.status === "ON NOW" ? "bg-red-600" : "bg-white/25"
                  }`}>
                    {programme.status}
                  </span>
                )}
                <h3 className="min-h-10 text-base font-extrabold leading-5 text-white">
                  {programme.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-xs text-gray-200">
                  <Clock3 size={14} className="text-[#FFC400]" />
                  {programme.time}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgrammeSchedule
