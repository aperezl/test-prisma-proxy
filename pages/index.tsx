import type { NextPage } from 'next'
import { Button } from '../components/Button'
import { StyledLink } from '../components/StyledLink'
import Login from '../components/Login'
import { useSession, getSession } from "next-auth/react"


const Home: NextPage = () => {
  return (
   <>
    <Login />
    <hr />

    <hr />
    <StyledLink href="/about">About</StyledLink>
    <StyledLink href="/register">Register</StyledLink>
    <Button>Hello</Button>
   </>
  )
}

export default Home