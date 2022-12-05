
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

// const employeeCard = function(employee) {

const managerCard = function(manager) {
    return `
    <div class="card" style="width: 18rem;">
            <div class="card-header">
            <h5>${manager.name}</h5>
            <div class="card-subtitle mb-2 text-muted">${manager.role}</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${manager.id}</li>
                <li class="list-group-item">Email: ${manager.email}</li>
                 <li class="list-group-item">Office Number: ${manager.officeNumber}</li>
            </ul>
            </div>
            </div>
            `;
}

function engineerCard(engineer) {
    return `
    <div class="card" style="width: 18rem;">
            <div class="card-header">
            <h5>${engineer.name}</h5>
            <h6 class="card-subtitle mb-2 justify-content-center text-muted">${engineer.role}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${engineer.id}</li>
                <li class="list-group-item">Email: ${engineer.email}</li>
                 <li class="list-group-item">Github: ${engineer.github}</li>
            </ul>
            </div>
            </div>
            `;
}

function internCard(intern) {
    return `
    <div class="card" style="width: 18rem;">
            <div class="card-header">
            <h5>${intern.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${intern.role}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${intern.id}</li>
                <li class="list-group-item">Email: ${intern.email}</li>
                 <li class="list-group-item">School: ${intern.school}</li>
            </ul>
            </div>
            </div>
            `;
}


function renderHTMLFile() {
    fs.writeFileSync('./index.html',`
    
    <!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <title>Team</title>
</head>
<body>
   <div class="container-fluid">
      <div class="row">
         <div class="col-md-12">
            <h1>Team</h1>
            
            ${employees.map((employee) => {
                switch (employee.getRole()) {
                  case "Manager":
                    return managerCard(employee);
                  case "Engineer":
                    return engineerCard(employee);
                  case "Intern":
                    return internCard(employee);
                }
              }
              ).join("")}
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

}


newEmployee()