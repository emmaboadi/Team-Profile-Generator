const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the manager\'s name:',
  },
  {
    type: 'input',
    name: 'id',
    message: 'Enter the manager\'s ID:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter the manager\'s email:',
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Enter the manager\'s office number:',
  },
];

const engineerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the engineer\'s name:',
  },
  {
    type: 'input',
    name: 'id',
    message: 'Enter the engineer\'s ID:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter the engineer\'s email:',
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter the engineer\'s GitHub username:',
  },
];

const internQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the intern\'s name:',
  },
  {
    type: 'input',
    name: 'id',
    message: 'Enter the intern\'s ID:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter the intern\'s email:',
  },
  {
    type: 'input',
    name: 'school',
    message: 'Enter the intern\'s school:',
  },
];

const menuQuestion = {
  type: 'list',
  name: 'choice',
  message: 'What would you like to do next?',
  choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
};

function addManager() {
  inquirer.prompt(managerQuestions).then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    team.push(manager);
    menu();
  });
}

function addEngineer() {
  inquirer.prompt(engineerQuestions).then((answers) => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    team.push(engineer);
    menu();
  });
}

function addIntern() {
  inquirer.prompt(internQuestions).then((answers) => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    team.push(intern);
    menu();
  });
}

function menu() {
  inquirer.prompt(menuQuestion).then((answer) => {
    switch (answer.choice) {
      case 'Add an engineer':
        addEngineer();
        break;
      case 'Add an intern':
        addIntern();
        break;
      case 'Finish building the team':
        generateHTML();
        break;
      default:
        console.log('Invalid choice');
    }
  });
}

function generateHTML() {
  const html = render(team);
  const outputPath = './output/team.html';
  fs.writeFileSync(outputPath, html);
  console.log(`HTML file generated at ${outputPath}`);
}

addManager();