import { Icons, Icon } from '../../icons'

type SvgProps = {
  icon: Icon
  className?: string
  size?: number
  title?: string
  fill?: string
}

export function SvgIcon({ className, size = 24, icon, title, fill }: SvgProps) {
  const IconComponent = Icons[icon]
  return <IconComponent className={className} height={size} width={size} title={title} fill={fill} />
}
