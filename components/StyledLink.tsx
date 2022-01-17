import styled from 'styled-components'
import Link from 'next/link'

const A = styled.a`
  text-decoration: none;

  &:hover {
    border-bottom: 2px solid #09f;
  }
`

export function StyledLink(props: any) {
  return (
    <Link href={props.href} passHref>
      <A {...props} />
    </Link>
  )
}