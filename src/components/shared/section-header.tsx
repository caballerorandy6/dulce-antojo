interface SectionHeaderProps {
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeader({
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="mb-4 text-3xl font-bold text-pink-text md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
