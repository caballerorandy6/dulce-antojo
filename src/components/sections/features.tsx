import { businessInfo } from '@/lib/constants'

export function Features() {
  return (
    <section className="bg-pink-soft px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
            Every Service Includes
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {businessInfo.allServicesInclude.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-accent/30">
                <span className="text-2xl font-bold text-pink-text">
                  {index + 1}
                </span>
              </div>
              <p className="text-lg font-medium text-pink-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
