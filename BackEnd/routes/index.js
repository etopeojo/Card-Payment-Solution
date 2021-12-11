var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/makePayment', function (req, res, next) {
  console.log(req.body);
  if (!req.body.creditCardNumber || !req.body.cardHolder || !req.body.expirationDate || !req.body.securityCode) {
    return res.status(400).send(`Error: Request must contain these payload properties[creditCardNumber, cardHolder, expirationDate, securityCode]`);
  }
  res.send("Success!!!");
});

module.exports = router;
