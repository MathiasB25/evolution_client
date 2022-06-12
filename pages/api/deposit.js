import axios from "axios"

export default async function handler(req, res) {
    const { symbol, name, price, amount: convert, user: _id, config } = req.body

    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/tokens/deposit`, { symbol, name, price, amount: convert, user: _id }, config)
        res.json(data)
    } catch (error) {
        console.log(error.response.data)
    }
}