import { NotificationsResponse } from "../../types"
import axiosClient from "../lib/axios-client"

const notificationApi = {
   getNotifications: async (token: string) => {
        const response = await axiosClient.get("/notifications", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data as NotificationsResponse
   } 
}

export default notificationApi