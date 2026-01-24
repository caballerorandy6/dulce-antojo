import { Instagram } from 'lucide-react'
import { businessInfo } from '@/lib/constants'

interface SocialLinksProps {
  className?: string
  iconClassName?: string
}

export function SocialLinks({ className = '', iconClassName = 'h-5 w-5' }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href={businessInfo.contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        className="text-muted-foreground transition-colors hover:text-teal-primary"
      >
        <Instagram className={iconClassName} />
      </a>
    </div>
  )
}
