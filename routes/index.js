const router = require('express').Router();
const apiRoutes = require('./api-routes');

router.use('./api-routes', apiRoutes);

router.use((req, res) => {
    return res.send("Wrong Route!");
});

module.exports = router;