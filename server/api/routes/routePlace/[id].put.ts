import prisma from "~/lib/prisma"

import { authUser } from "~/shared/utils/abilities"

interface Body {
    name: string
    description: string
    lot: number
    lat: number
}

export default eventHandler(async(event) => {
    const { user } = await requireUserSession(event)
    // setUserContext(+user.yandexId)
    
        const {name, description, lot, lat} = await readBody<Body>(event)
        const id = +getRouterParam(event, 'id')!
        const rewriteRoutePlace =  await prisma.withUser(user).roultePlace.update({
            where:{
                id:+id,
                route:{
                    creater_id:+user.yandexId
                }
            },
            data:{
                name,
                description,
                lat,
                lot
            }
        })

        // clearUserContext()
        return rewriteRoutePlace
    
})