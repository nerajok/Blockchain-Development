let balance = 0;

const deposit = (amount) => {
    balance = balance + amount;
//    console.log("Deposit " + amount + " into account");
    console.log(`Deposit ${amount} into account`);
};

const withdrawal = (amount) => {
    balance = balance - amount;
    console.log(`Withdrawal ${amount} from account`);
};

const checkBalance = () => {
  console.log(`The Balance is ${balance}`);
}

//calls functions and outputs results

checkBalance();
deposit(100);
checkBalance();
withdrawal(25);
checkBalance();
