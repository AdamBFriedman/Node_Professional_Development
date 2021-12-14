/**
 * Require files in this order:
 * 1. Core modules
 * 2. NPM packages
 * 3. Local files
 */

// const validator = require("validator");
// const getNotes = require("./notes");

// const msg = getNotes();
// console.log(msg)

// console.log(validator.isEmail("adam@examplecom"));

// Chalk

// const chalk = require("chalk");
// import chalk from "chalk";

// const log = console.log;

// log(chalk.blue.bold.inverse("SUCCESS!"));

// Command line variables

const yargs = require("yargs");
const notes = require("./notes");

// Create add command
yargs.command({
  command: "add",
  description: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  description: "Remove an existing note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  description: "List a note",
  handler: () => {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: "read",
  description: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

console.log(yargs.argv);

// const command = process.argv[2];

// command === "add"
//   ? console.log("Adding a note")
//   : command === "remove"
//   ? console.log("Removing note...")
//   : null;

// See the difference between process and yargs (yargs is much cleaner)
// console.log(process.argv);
// console.log(yargs.argv);
