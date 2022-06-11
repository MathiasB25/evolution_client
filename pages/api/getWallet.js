import axios from "axios"

export default async function handler(req, res) {
    const { auth } = req.body
    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/users/wallet`, { user: auth._id })
        res.json(data)
    } catch (error) {
        console.log(error.response.data)
    }
}