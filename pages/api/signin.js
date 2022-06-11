import axios from "axios"

export default async function handler(req, res) {

    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/users/login`, req.body)
        res.json(data)
    } catch (error) {
        res.status(404).json({ msg: error.response.data.msg })
    }
}