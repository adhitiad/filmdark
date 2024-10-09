import { auth, signOut } from '@/lib/auth'
import React from 'react'

const page = async () => {
    const session = await auth()
    console.log(session)
    return (
        <>

            {
                session ? (
                    <div>
                        <h1>Page Found</h1>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                        <form
                            action={async () => {
                                "use server"
                                await signOut()
                            }}
                        >
                            <button type="submit">Sign Out</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Page  unauthorized</h1>
                    </div>
                )
            }

        </>
    )

}

export default page