import { auth } from '@/lib/auth'
import Link from 'next/link'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    const urlLogin = '/api/auth/signin'
    const urlCallback = '/api/auth/callback'

    return (
        <div>
            {session ? (
                children
            ) : (
                <div>
                    {
                        <Link href={`${urlLogin}?callbackUrl=${urlCallback}`}>
                            Login
                        </Link>
                    }
                </div>
            )}
        </div>
    )

}

export default layout