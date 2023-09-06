import InitialModal from '@/components/modals/Initial-modal'
import db from '@/lib/db'
import { getInitialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'
import React from 'react'
const SetupPage = async () => {
    const profile = await getInitialProfile();

    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile?.id
          }
        }
      }
    });

    if (server) {
        redirect(`/servers/${server.id}`)
    }
    // console.log(profile)
    // console.log("server", server)
    return <InitialModal />
}

export default SetupPage
