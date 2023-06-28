import { ReactNode, HTMLAttributes } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  font-family: var(
    --font-family,
    CircularSp,
    CircularSp-Arab,
    CircularSp-Hebr,
    CircularSp-Cyrl,
    CircularSp-Grek,
    CircularSp-Deva,
    var(--fallback-fonts, sans-serif)
  );
  background-color: transparent;
  border: 0px;
  border-radius: 500px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  touch-action: manipulation;
  transition-duration: 33ms;
  transition-property: background-color, border-color, color, box-shadow, filter, transform;
  user-select: none;
  vertical-align: middle;
  transform: translate3d(0px, 0px, 0px);
  color: var(--text-base, #000000);
  min-inline-size: 0px;
  padding-block: 12px;
  min-block-size: 48px;
  padding-inline: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.span.attrs({
  'aria-hidden': true // hidden to screen readers
})``

type ButtonIconProps = {
  children: ReactNode
  attrs: HTMLAttributes<HTMLButtonElement>
}

export function ButtonIcon({ attrs, children }: ButtonIconProps) {
  return (
    <Button {...attrs}>
      <IconWrapper>{children}</IconWrapper>
    </Button>
  )
}
