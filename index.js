
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
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
    ]).then(({ position, email, id, name }) => {
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

                   another()
                })
            
            break;
            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What school did the intern attend?',
                    }
                ]).then(({ school }) => {
                    employees.push(new Intern(
                        name,
                        id,
                        email,
                        school
                    ))

                    another()
                })
                
    
            break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is the Engineers Github account?',
                    }
                ]).then(({ github }) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        github
                    ))

                    another()
                })
    
            break;
            default:

    
        }
    
      
    })
}

function another() {
   return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Another employee?'
        }
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html');
}

function managerCard(manager) {
    return `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${manager.name}</h5>
            <p class="card-text">${manager.email}</p>
            <p class="card-text">${manager.officeNumber}</p>
            </div>
            </div>
            `;
}

const engineerCard = function (engineer) {
    return `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${engineer.name}</h5>
            <p class="card-text">${engineer.email}</p>
            <p class="card-text">${engineer.github}</p>
            </div>
            </div>
            `;
}

function internCard(intern) {
    return `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${intern.name}</h5>
            <p class="card-text">${intern.email}</p>
            <p class="card-text">${intern.officeNumber}</p>
            </div>
            </div>
            `;
}

newEmployee()
managerCard()
engineerCard()
internCard()

renderHTMLFile()