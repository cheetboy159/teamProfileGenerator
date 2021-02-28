const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const members = [];
// console.log(members);
function askQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What is the members role?',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'role'
        }
    ]).then(response => {
        console.log(response)
        if (response.role === "Manager") { 
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is manager Name',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'What is the managers ID number?',
                    name: 'id'
                },
                {
                    type: 'input',
                    message: 'What is managers email?',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'What is managers phone number?',
                    name: 'officeNumber'
                },
                {
                    type: 'confirm',
                    message: 'Would you like to add a new member?',
                    name: 'askForNewMember'
                }
            ]).then(response => {
                // console.log(response);
                const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
                console.log(manager);
                members.push(manager);
                if(response.askForNewMember === true){
                    askQuestions();
                }else{
                    render();
                }
            })
        }
        else if (response.role === "Engineer") { 
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is Engineers name?',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'What is the Engineers ID number?',
                    name: 'id'
                },
                {
                    type: 'input',
                    message: 'What is Engineers email?',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'What is Engineers github username?',
                    name: 'github'
                },
                {
                    type: 'confirm',
                    message: 'Would you like to add a new member?',
                    name: 'askForNewMember'
                }
            ]).then(response =>{
                // console.log(response);
                const engineer = new Engineer(response.name, response.id, response.email, response.github);
                console.log(engineer);
                members.push(engineer);
                if (response.askForNewMember === true) {
                    askQuestions();
                } else {
                    render();
                }
            })
        }
        else if (response.role === "Intern") { 
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is Intern Name',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'What is the Intern ID number?',
                    name: 'id'
                },
                {
                    type: 'input',
                    message: 'What is the Intern email?',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'What is the Interns school name?',
                    name: 'school'
                },
                {
                    type: 'confirm',
                    message: 'Would you like to add a new member?',
                    name: 'askForNewMember'
                }
            ]).then(response=>{
                // console.log(response);
                const intern = new Intern(response.name, response.id, response.email, response.school);
                console.log(intern);
                members.push(intern);
                if (response.askForNewMember === true) {
                    askQuestions();
                } else {
                    render();
                }
            })
        }
    }).then(response =>{
        console.log(response);
        renderMembers();
    })

}
function render(){
fs.writeFileSync(outputPath, render(members), "utf-8");
}
askQuestions();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```