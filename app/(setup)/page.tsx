import InitialModal from '@/components/InitialModal/InitialModal'
import db from '@/lib/db'
import { getInitialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

import React from 'react'
const SetupPage = async () => {
    const profile = await getInitialProfile()
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    id: profile?.id
                }
            }
        }
    })

    if (server) {
        redirect(`/server/${server.id}`)
    }
    return <InitialModal />
}

export default SetupPage
