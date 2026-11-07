import type { ReactNode } from 'react'

/** 品牌 Logo：爱心 + 指南针概念 */
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" fill="#FFE2ED" />
      <path
        d="M32 48 C19 39.5 14 33 14 26 C14 20.5 18 17 22.5 17 C26 17 28.5 19 32 23 C35.5 19 38 17 41.5 17 C46 17 50 20.5 50 26 C50 33 45 39.5 32 48 Z"
        fill="#F6A9C8"
      />
      {/* 指南针指针 */}
      <path d="M32 23 L36 32 L32 41 L28 32 Z" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="2.5" fill="#E77FA9" />
    </svg>
  )
}

/** 品牌文字组合 */
export function BrandLockup({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Logo size={size} />
      <div className="leading-tight text-left">
        <div className="font-bold text-plum text-lg">恋爱坐标</div>
        <div className="text-[11px] tracking-wide text-rose/70 uppercase">
          Love Compass
        </div>
      </div>
    </div>
  )
}

/** 胶囊按钮 */
export function PillButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'soft'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none select-none'
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-rose to-pink text-white shadow-soft hover:shadow-lg hover:brightness-105',
    ghost:
      'bg-white text-plum border border-pink/40 hover:bg-blush/50',
    soft: 'bg-blush text-plum hover:bg-pink/30',
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

/** 装饰性星星 */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
    </svg>
  )
}

/** 装饰性花朵 */
export function Flower({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <ellipse cx="12" cy="5" rx="3.5" ry="4.5" />
      <ellipse cx="12" cy="19" rx="3.5" ry="4.5" />
      <ellipse cx="5" cy="12" rx="4.5" ry="3.5" />
      <ellipse cx="19" cy="12" rx="4.5" ry="3.5" />
    </svg>
  )
}
