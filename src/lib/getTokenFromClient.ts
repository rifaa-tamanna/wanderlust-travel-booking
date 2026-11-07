import { authClient } from "./auth-client"

export const getTokenFromClient = async() => {
    const { data, error } = await authClient.token()
    if(error) {
      console.log(error)
      return
    }

    const token = data.token
    return token
}