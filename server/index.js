const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const accSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const client = new twilio(accSid, authToken);

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the express server of hackathon project');
});

app.get('/send-text', (req, res) => {
    const { recipient, polStation } = req.query;

    console.log('SMS request received:', { recipient });

    client.messages.create({
        body: `Thank you for vising Police Station. \nYou are requested to kindly fill the feedback form by clicking on the url: https://feedback-system-police-private.vercel.app/myVisits after your visit. It is mandatory to fill the feedback form. \nRegards`,
        to: recipient,
        from: '+19287560963' // From Twilio
    })
    .then((message) => {
        console.log(message.body);
        res.send('SMS sent successfully');
        console.log(recipient);
    })
    .catch((error) => {
        console.error('Error sending SMS:', error);
        res.status(500).send(`Error sending SMS: ${error.message}`);
        console.log(recipient);
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Running on port ${port}`));

