import axios from "axios"

export default async function handler(req, res) {
    const { name, email, password, _id, config } = req.body
    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/users/edit`, { name, email, password, userId: _id }, config)
        res.json(data)
    } catch (error) {
        console.log(error.response.data)
    }
}