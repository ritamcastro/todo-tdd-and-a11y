#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const PREFERED_EDITOR = "code"
const [, , mode, taskNumber] = process.argv;
const isExercise = mode === 'exercise';
const isSolution = mode === 'solution' || mode === "solution-extra"

if (!isExercise && !isSolution) {
    logError(`❌ Invalid mode: "${mode}"`);
}

if (process.argv.length === 0) {
    logError('‼️ Please specify an number, e.g., pnpm exercise 01, pnpm solution 02 or pnpm solution:extra 04');
}

const taskDirectory = findTaskDirectory(path.join(__dirname, '..', 'workshop'), taskNumber);
if (taskDirectory === null) {
    logError(`🤷 Exercise ${taskNumber} not found!`);
}

const taskName = taskDirectory.name.slice(`${taskNumber}-`.length);
const taskPath = path.join(taskDirectory.path, mode);

logInfo(`🚧 Starting Exercise ${taskNumber}: ${taskName}...`);

const hasVsCode = hasPreferedIde(PREFERED_EDITOR);

// Setup the exercise 
try {
    process.chdir(taskPath);
    child_process.execSync('pnpm install', { stdio: 'inherit' });

    // Open VS Code
    if (hasVsCode) {
        child_process.execSync(`${PREFERED_EDITOR} .`, { stdio: 'inherit' });
    } else {
        logInfo(`🔔 For a focused experience, open ONLY the folder ${taskPath}.`);
    }
} catch (error) {
    console.error('‼️ Error running exercise:', error);
}

function findTaskDirectory(workshopPath, taskNumber) {
    const prefix = `${taskNumber}-`;

    const entries = fs.readdirSync(workshopPath, { withFileTypes: true });

    const match = entries.find(entry => entry.isDirectory() && entry.name.startsWith(prefix));
    if (!match) {
        return null;
    }
    return { name: match.name, path: path.join(workshopPath, match.name), };
}


// Helper function to check if the machine has VS Code installed so that 
// we can open it up with the exercise/solution folder
function hasPreferedIde(ideExecutable) {
    console.log("here")
    logInfo(`🔍 Checking if ${ideExecutable} is available`)

    const command = process.platform === 'win32' ? `where ${ideExecutable}` : `which ${ideExecutable}`;
    let hasVsCode = false;

    try {
        child_process.execSync(command, { stdio: 'ignore' });
        hasVsCode = true;
    } catch {
        hasVsCode = false;
    }
    return hasVsCode
}

// Helper function to log errors
function logError(string) {
    console.error("");
    console.error(string);
    console.error("");
    process.exit(1);
}

// Helper function to log information
function logInfo(string) {
    console.log("");
    console.log(string);
    console.log("");
}
