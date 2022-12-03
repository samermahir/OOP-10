
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
inquirer.prompt ([
    {
        type: 'list',
        name: 'position',
        message: 'What position is this employee?',
        choices: [
            'Manager',
            'Intern',
            'Engineer'
        ]
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email address of this employee?',
        
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of this employee?',
    }
]).then(({ position }) => {
    switch (position) {
        case 'Manager':
        

        case 'Intern':


        case 'Engineer':

        
        default:

    }

})