import { currentUser } from "@clerk/nextjs"
import db from "@/lib/db"

export const currentProfile = async () => {
    const user = await currentUser()
    if (!user) return null
    const profile = db.profile.findUnique({
        where: {
            userId: user.id
        }
    })
    return profile
}