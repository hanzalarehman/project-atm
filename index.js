#! /usr/bin/env node
import inquirer from "inquirer";
console.log(`welcome to ATM build using typescript there is a user created named Ameen having balance RS 100000 and my pinCode is 2001`);
let user = {
    name: "Ameen",
    pin: 2001,
    balance: 100000
};
const answer = await inquirer.prompt([{
        name: "pin",
        type: "password",
        message: "Enter your PIN"
    }, {
        name: "accounts",
        type: "list",
        choices: ["CurrentAccount", "SavingAccount"],
        message: "Choose an account to perform"
    }]);
let continueTransaction = true;
if (answer.pin != user.pin) {
    console.log("Invalid Pin");
}
else {
    while (continueTransaction == true) {
        const answer = await inquirer.prompt([{
                name: "selectedtype",
                type: "list",
                choices: ["Deposit", "Withdrawal", "FastCash", "balanceEnquiry"]
            },
            {
                name: "amount",
                type: "list",
                choices: ["15000", "25000", "30000", "40000"],
                when: (answers) => { return answers.selectedtype == "FastCash"; }
            }, {
                name: "amount",
                type: "number",
                message: "How much do you want to withdraw?",
                when: (answer) => {
                    return answer.selectedtype == "Withdrawal";
                },
            },
            {
                name: "amount",
                type: "number",
                message: "How much do you want to withdraw?",
                when: (answer) => {
                    return answer.selectedtype == "Deposit";
                },
            }
        ]);
        if (answer.selectedtype == "balanceEnquiry") {
            console.log(`Your current Balance is: ${user.balance}`);
            const repeat = await inquirer.prompt([{
                    name: "repeat",
                    type: "confirm",
                    message: `Do you wish to check your another transaction?`
                }]);
            if (repeat.repeat == true) {
                continueTransaction = true;
            }
        }
        else {
            if (answer.amount) {
                user.balance = user.balance + answer.amount;
                console.log(`Your balance is: ${user.balance}`);
                continueTransaction = false;
            }
            else {
                if (answer.amount <= user.balance) {
                    user.balance = user.balance - answer.amount;
                    console.log(`your remaining balance is:  ${user.balance}`);
                    continueTransaction = false;
                }
                else {
                    console.log("Insufficient balance");
                }
            }
        }
    }
}
