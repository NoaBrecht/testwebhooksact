import express from 'express';

const app = express();
const PORT = 80;
app.use(express.json());
// dit is geen Github secret
// deze code runt normaal op een andere machine dan de workflow
const VALID_SECRET = 'my-secret-pw';

app.post('/webhook', (req, res) => {
    const auth_header = req.headers.authorization;
    if (auth_header && auth_header.startsWith("Bearer ")) {
        const token = auth_header.substring(7);
        if (token.trim() == VALID_SECRET) {
            console.log('Received valid webhook:');
            res.status(200).send('Webhook processed successfully!');
        } else {
            console.log("Gegevens waren ongeldig");
            res.status(403).send("Acces denied");
        }
    }
    else {
        console.warn("Header ontbrak of formaat klopte niet.");
        res.status(403).send("Acces denied");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
