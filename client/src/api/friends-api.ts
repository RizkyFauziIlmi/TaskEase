import { GetAddFriend, GetFriends } from "../../types"
import axiosClient from "../lib/axios-client"

const friendsApi = {
    search: async (token: string, query: string) => {
        const response = await axiosClient.get(`/friends/search?q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data as GetAddFriend
    },
    addFriend: async (token: string, friendUserId: string) => {
        const response = await axiosClient.post(`friends/add-friend/${friendUserId}`, undefined, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    },
    getFriends: async (token: string) => {
        const response = await axiosClient.get("/friends", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data as GetFriends
    },
    acceptFriend: async (token: string, friendsId: string) => {
        const response = await axiosClient.put(`/friends/accept/${friendsId}`, undefined, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    },
    rejectFriend: async (token: string, friendsId: string) => {
        const response = await axiosClient.delete(`/friends/reject/${friendsId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    },
    deleteFriend: async (token: string, friendsId: string) => {
        const response = await axiosClient.delete(`/friends/delete/${friendsId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    }
}

export default friendsApi