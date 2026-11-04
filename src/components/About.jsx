import { Video, Users, Landmark } from "lucide-react"

const features = [
  { icon: Video, title: <>Cultural<br />Programmes</> },
  { icon: Users, title: <>People &<br />Stories</> },
  { icon: Landmark, title: <>Festivals<br />& Events</> },
]

function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b border-[#FFC400]/20 bg-[#0b0909] py-14 sm:py-16">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-red-900/15 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-16">
        {/* Photo collage */}
        <div className="relative mx-auto h-[340px] w-full max-w-[520px]">
          <div className="absolute left-[5%] top-[18%] h-[68%] w-[38%] -rotate-6 overflow-hidden rounded-xl border-4 border-white shadow-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0uUwprM5RENcD4BBIx-B4tI-Olzy2qMeP5zbiZSiBg&s=10"
              alt="Cultural landmark and city scene"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute left-[30%] top-0 z-10 h-[78%] w-[42%] rotate-3 overflow-hidden rounded-xl border-4 border-white shadow-2xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaS4bGPcT6h8QBtsNj35duOLVe1rgF7cizlacRbfZ09A&s=10"
              alt="Festival performer in colorful costume"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-[3%] right-[2%] z-20 h-[55%] w-[48%] rotate-3 overflow-hidden rounded-xl border-4 border-white shadow-xl">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvm9S1o3QPxuueJXhOpECQHajHrYQZJDkZK4WpP7fbnA&s=10"
              alt="Aerial view of a city"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-[12%] left-[25%] h-12 w-3/4 -rotate-3 rounded-lg bg-[#FFC400]" />
        </div>

        {/* About copy */}
        <div>
          <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.15em] text-[#FFC400]">
            About Califest TV
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
            More Than a TV Channel
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-300 sm:text-base">
            Califest TV is a cultural and lifestyle television platform showcasing the beauty, people and creativity of Calabar, Cross River State and Africa at large.
          </p>

          <div className="mt-8 grid grid-cols-3 divide-x divide-white/25">
            {features.map(({ icon: Icon, title }, index) => (
              <div key={index} className="px-3 text-center first:pl-0 last:pr-0">
                <Icon size={31} className="mx-auto mb-3 fill-[#FFC400] text-[#FFC400]" />
                <p className="text-xs font-semibold leading-4 text-white sm:text-sm">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
