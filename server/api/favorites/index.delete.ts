import { useCurrentUser } from "~/composable/useCurrentUser"
import prisma from "~/lib/prisma"
import { authUser } from "~/shared/utils/abilities"

interface Body{
    id: number
}

export default eventHandler(async(event) => {
    if (authUser) {
        const { user } = useCurrentUser()
        const {id} = await readBody<Body>(event)
        await prisma.favorites.delete({
            where:{
                id,
                user_id:user.yandexId         
            }
        })
    }
})