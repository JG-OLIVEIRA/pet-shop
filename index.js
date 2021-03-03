const inquirer = require('inquirer');
const fs = require('fs');
var dadosDosPetsConvertidos = JSON.parse(fs.readFileSync('data.json'));


function meuPet(id, pet, raca, dono){
    this.id = id;
    this.pet = pet;
    this.raca = raca;
    this.dono = dono;
}


inquirer.prompt({
    name: 'opcao',
    type: 'list',
    choices: [
        {
            name: 'Cadastrar novo pet',
            value: 0,
        },
        {
            name: 'Listar todos os pets cadastrados',
            value: 1,
        },
        {
            name: 'Buscar pet pelo nome',
            value: 2,
        }
    ]
}).then((resposta) => {
    let opcao = resposta.opcao;
    if (opcao === 0){
        inquirer.prompt([
            {
                name: 'id',
                message: 'identificador: ',
                validate: (valor) => {
                    for (elem of dadosDosPetsConvertidos){
                        if (elem['id'] == valor){
                            return false
                        } else {
                            return true
                        }
                    }
                }
            },
            {
                name: 'pet',
                message: 'nome do pet: ',
            },
            {
                name: 'raca',
                message: 'raça: ',
            },
            {
                name: 'dono',
                message: 'nome do dono: ',
            },
        ]).then((resposta2) => {
            dadosDosPetsConvertidos.push(new meuPet(resposta2.id, resposta2.pet, resposta2.raca, resposta2.dono))
            fs.writeFileSync('data.json', JSON.stringify(dadosDosPetsConvertidos))
        })
    }
    if (opcao === 1){
        console.log('Pets cadastrados: ')
        console.log('-------------------------')
        for (elem of dadosDosPetsConvertidos){
            console.log('id: ' + elem['id'])
            console.log('raça: ' + elem['raca'])
            console.log('pet: ' + elem['pet'])
            console.log('dono: ' + elem['dono'])
            console.log('---------------------')
        }
    }
    if (opcao === 2){
        inquirer.prompt({
            name: 'nomedopet',
            type: 'input',
        }).then((resposta3) => {
            for (elem of dadosDosPetsConvertidos){
                if (elem['pet'] === resposta3.nomedopet){
                    console.log('---------------------')
                    console.log('id: ' + elem['id'])
                    console.log('raça: ' + elem['raca'])
                    console.log('pet: ' + elem['pet'])
                    console.log('dono: ' + elem['dono'])
                    console.log('---------------------')
                }
            }
        })
    }
})