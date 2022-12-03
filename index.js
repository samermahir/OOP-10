
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

const employees = []

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
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
            name: 'name',
            message: 'What is the name of this employee?',
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
    ]).then(({ position, email, id }) => {
        switch (position) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number of this employee?',
                    }
                ]).then(({ officeNumber }) => {
                   employees.push(new Manager(
                    name,
                    id,
                    email,
                    officeNumber
                   )) 
                })
            
            break;
            case 'Intern':
    
            break;
            case 'Engineer':
    
            break;
            default:
    
        }
    
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'more',
                message: 'Another employee?'
            }
        ])
    })
}