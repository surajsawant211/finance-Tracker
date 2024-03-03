const express = require('express')
const { addallTransactions, getallTransactions ,editallTransactions,deleteallTransactions} = require('../Controllers/transactionCtrl')


//router object

const router = express.Router()

// routes

// addallTransaction  || POST

router.post('/add-transaction',addallTransactions)
// editallTransaction  || POST

router.post('/edit-transaction',editallTransactions)


// delete allTransaction  || POST
router.post('/delete-transaction',deleteallTransactions)

//getalltransactions || GET

router.post('/get-transaction',getallTransactions)
module.exports = router