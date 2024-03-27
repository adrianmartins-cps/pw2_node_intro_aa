const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')


console.log("--||Iniciamos o Accounts ||--")

operation()

function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then((answer) => {
        const action = answer['action']

        if( action === 'Criar Conta' ){
            createAccount()
        }else if(action === 'Depositar'){
            deposit()
        }else if(action === 'Consultar Saldo'){
            console.log('Consultando saldo!')
            //getAccountBalance()
        } else if(action === 'Sacar'){
            withdraw()
        } else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts App!'))
            process.exit()
        }

    })
        .catch(err => console.log(err))
}

function creatAcount(){
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Bank!'))
    console.log(chalk.green('Vamos definir as opções da sua conta?'))
    
    buildAccount()
   
}

function buildAccount(){
     inquirer.prompt([
        {
            name: 'accountName',
            message: 'Forneça o nome para sua conta no Banco Accounts.'
        }
     ]).then((answer) => {
        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`account/${accountName}.Json`)){
            console.info(chalk.bgRed.black(`A conta: ${accountName} já existe.`))
            console.info(chalk.bgRed.black(`Escolha outro nome: `))
            buildAccount(accountName)
        }

        fs.writeFileSync(
            `accounts/${accountName}.Json`,
            `{"balance":0}`,
            function(err){
                console.error(err)
            }
        )

        console.info(chal.bgGreen.white(`Bem vindo ao Accounts Bank: ${accountName}`))
        console.info(chalk.green('obrigado pela preferência!'))

        operation()
     })
}

function deposit(){
    inquirer.prompt([ 
        {
        name: 'accountName' ,
        message: 'Qual conta deseja depositar?'
        } 
]).then((answer) => {
    const accountName = answer['accountName']

    if(!checkAccount(accountName)){
        return deposit()
    }

    inquirer.prompt([ 
        {
            name: 'amount' ,
            message: 'Quanto deseja depositar: '
        } 
    ]).then((answer) => {
        const amount = answer ['amount']

        addAmount(accountName, amont)
        operation()
    })
    

})
}

function checkAccount(accountName){
    if(!fs.existsSync(`account/${accountName}.Json`)){
        console.error(chalk.bgRed.black(`A conta: ${accountName}não existe`))
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.error(chalk.bgRed.black('Não há valor a ser depositado!'))
        deposite()

        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

        fs.writeFileSync(
          `accounts/${accountName}.Json`,
          JSON.stringify(accountData),
          function (err){
            console.error(err)
          }
        )       
    }
}

function getAccount(accountName){
    const accontJson = fs.readFileSync(`accounts/${accountName}.Json`,{
        enconding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJson)
}

function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'DE qual conta deseja realizar o saque: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!chackAccount(accountName)){
            console.error(chalk.bgRed,white('esta conta não existe! '))
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor deseja sacar da conta?'
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()
        })
    })
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.white('ocorreu um erro tente mais tarde'))
        return withdraw()
    }

    if(accountData.balance < amounth){
        console.error(chalk.brRed.white('Valor não esta disponivel!'))
        return withdraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `account/${accountName}.Json`,
        JSON.stringify(accountData),
        function (err){
            console.err(err)
        }
    )

    console.info(chalk.bgBlueBright.blue(`O valor: ${amount} foi retirado da conta ${accountName}`))
}