import axios from "axios"

export default async function handler(req, res) {
    const { config } = req.body
    try {
        const { data } = await axios(`${process.env.SERVER_URL}/api/users/profile`, config)
        res.json( data )
    } catch (error) {
        res.status(404).json({ msg: error.response.data.msg })
    }
}