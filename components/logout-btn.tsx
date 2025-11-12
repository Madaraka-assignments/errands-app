import { logoutUser } from '@/actions/auth'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {

  return (
    <form action={logoutUser}>
    <Button
    className='cursor-pointer'
        variant="ghost"
        type='submit'
    >
        <LogOut/>
        Log out
    </Button>
    </form>
  )
}

export default LogoutButton