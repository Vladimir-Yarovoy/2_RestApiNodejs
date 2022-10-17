import { v4 as uuidv4 } from 'uuid';
import FileSaver from '../fileSaver.js'
import fs from 'fs';
import { time } from 'console';
import { response } from 'express';

const filePath = "transactions.json"

class TransactionController {

    createTransaction(req, res) {
        if(req.body.fromAddress && req.body.count && req.body.toAddress) {
            const {fromAddress, count, toAddress, description} = req.body;
            let fileName = "Not loaded";
            if (req.files) {
                let fileNamePicture = FileSaver.saveFile(req.files.picture);
                fileName = fileNamePicture;
            }
            let transaction = {id: uuidv4(), fromAddress, count, toAddress, time: `${new Date()}`, description, picture: fileName}
            let content = fs.readFileSync(filePath, "utf8")
            let transactions = JSON.parse(content);
            transactions.push(transaction);
            content = JSON.stringify(transactions);
            fs.writeFileSync(filePath, transactions);
            res.send(`Transaction from the address ${req.body.fromAddress} added to the database`)
        }
        else {
            res.send("Incorrect input, required fields: fromAddress, count, toAddress");
        }
    }

    getTransaction(req, res) {
        const id = req.params.id;
        const content = fs.readFileSync(filePath, "utf8")
        const transactions = JSON.parse(content);
        let transaction;
        for(let i=0; i<transactions.length; i++) {
            if(transactions[i].id === id) {
            transaction = transactions[i];
            break;
            }
        }
        if (transaction) {
            res.send(transaction)
        }
    }

    getAllTransactions(req, res) {
        const content = fs.readFileSync(filePath, "utf8")
        const transactions = JSON.parse(content);
        res.send(transactions);
    }

    deleteTransaction(req, res) {
        const id = req.params.id;
        let content = fs.readFileSync(filePath, "utf8")
        let transactions = JSON.parse(content);
        let index = -1;
        for(let i = 0; i < transactions.length; i++) {
            if(transactions[i].id == id){
                index = i;
                break;
            }
        }
        if(index > -1) {
            transactions.splice(index, 1);
            content = JSON.stringify(transactions);
            fs.writeFileSync(filePath, content);
            res.send(`Transaction with the id ${req.params.id} deleted from the database`);
        }
    }

    updateTransaction(req, res) {
        const {description, count, time, toAddress, fromAddress } = req.body;
        const id = req.params.id;
        let content = fs.readFileSync(filePath, "utf8")
        let transactions = JSON.parse(content);
        let transaction;
            for(let i=0; i<transactions.length; i++) {
                if(transactions[i].id === id) {
                transaction = transactions[i];
                break;
                }
            }
        if(transaction) {
            if(description) transaction.description = description; 
            if(req.files) {
                let fileNamePicture = FileSaver.saveFile(req.files.picture);
                transaction.picture = fileNamePicture;       
            }     
            content = JSON.stringify(transactions);
            fs.writeFileSync(filePath, content);
            if(!description && !req.files) res.send("Only description or picture can be updated");
            res.send(`Description or picture has been updated`);
        }
        else {
            res.send(`Transaction ${id} not found`);
        }
    }
}

export default new TransactionController();