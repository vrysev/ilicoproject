const express = require("express");
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/api/orders', async (req, res) => {
    try {
        const { filter, page, startsWith } = req.query;

        const params = {
            detail: 'full',
            limit: 10,
            start: (page - 1) * 10,
            filter,
        };

        const response = await axios.get('https://demo.flexibee.eu/v2/c/demo/objednavka-prijata', {
            params,
            headers: {
                'Accept': 'application/json',
            },
        });

        let orders = response.data && response.data.winstrom ? response.data.winstrom['objednavka-prijata'] || [] : [];
        // Implement filtering based on startsWith if provided
        if (startsWith) {
            // Find all orders that match the filter
            orders = orders.filter(order =>
                Object.values(order).some(value =>
                    value && value.toString().toLowerCase().startsWith(startsWith.toLowerCase())
                )
            );
        }
        res.json({ winstrom: { 'objednavka-prijata': orders } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/faktura', async (req, res) => {
    try {
        const response = await axios.get('https://demo.flexibee.eu/v2/c/demo/faktura-vydana?detail=full&limit=0', {
            headers: {
                'Accept': 'application/json',
            },
        });

        const faktura = response.data;
        res.json(faktura);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});