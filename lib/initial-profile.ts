import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import db from "./db";

export async function getInitialProfile() {
    const user = await currentUser();
    if (!user) {
        redirectToSignIn();
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: user?.id,
        },
    });
    if (profile) {
        return profile;
    }
    if (user) {
        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        return newProfile
    }
}