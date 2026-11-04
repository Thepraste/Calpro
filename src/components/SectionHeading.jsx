function SectionHeading({ children, accent = false, icon = null, action = null }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <span className="text-2xl text-[#FFC400]">{icon}</span>}
        <h2 className="border-l-[5px] border-[#E51B23] pl-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {children}
        </h2>
      </div>
      {action}
    </div>
  )
}

export default SectionHeading
