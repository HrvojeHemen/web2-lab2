

export default function handler(req, res) {
    let referrer = req.headers
    console.log("referrer url",referrer);

    res.status(200).json({ name: 'John Doe' })
}