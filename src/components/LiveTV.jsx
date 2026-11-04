import { Radio } from "lucide-react"
import SectionHeading from "./SectionHeading"
import VideoPlayer from "./VideoPlayer"

function LiveTV() {
  return (
    <section id="live" className="relative overflow-hidden bg-[#090909] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.8fr_0.8fr]">
          <div>
            <SectionHeading>Live TV</SectionHeading>
            <VideoPlayer />
          </div>

          <aside className="px-1 py-4 lg:px-5">
            <span className="mb-4 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs font-extrabold text-white">
              <Radio size={14} /> AFRICA'S BIGGEST STREET PARTY            </span>
            <h3 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              Califest TV
              <br />
              Live Broadcast
            </h3>
            <p className="mt-4 text-sm font-medium text-gray-300">
              Culture <span className="mx-2 text-[#FFC400]">|</span>
              Festivals <span className="mx-2 text-[#FFC400]">|</span>
              People
            </p>
            <div className="my-5 h-[3px] w-10 bg-[#FFC400]" />
            <p className="max-w-sm text-sm leading-6 text-gray-300">
              Watch the thrill and joy of carnival celebrations live on Califest TV.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default LiveTV
