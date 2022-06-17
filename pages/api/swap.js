import axios from "axios"

export default async function handler(req, res) {
    const { symbolFrom, priceFrom, valueFrom, nameTo, symbolTo, priceTo, convert, user, config } = req.body
    try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/tokens/swap`, { symbolFrom, priceFrom, valueFrom, nameTo, symbolTo, priceTo, convert, user }, config)
        res.json(data)
    } catch (error) {
        console.log(error.response.data)
    }
}