/*
Helper functions for the HTML/CSS based UI made using NodeJS and Electron Framework.
    Copyright (C) 2020  Dhiman Seal

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { shell } from 'electron';
const fs = require('fs');

let strArr = [];
// Store symbol and shell script to file settings.dat
let symbol;
let script;
const errorMessage = document.getElementById('shell_symb');


function prompt() {
  const promptHere = document.getElementById('multilinePrompt');
  promptHere.innerHTML = '<br><label for="shellscr" style="font-size: large">Script contains multiple lines. Must be stored as a <b>Script file</b>.<br>Define this Script: </label><br>' +
        '<input name="shell_script" type="text" style="width: 550px;  border-radius: 5px; border: solid black; padding: 20px 5px" class="shelltf" placeholder="Name of script (and extension, if checkbox below is left unchecked )" id="script_name" required="required" data-validation-required-message="Please enter the name to save the script as.">' +
        '<br><input name="shell_script" type="text" style="width: 550px; border: 2px solid #ccc; padding: 5px 5px" class="shelltf" placeholder="Program that executes it(if not directly) eg. python for .py files" id="executioner" data-validation-required-message="Enter the command that executes the Script.">' +
        '<br><p class="help-block text-danger" id="shell_symb"></p>' +
        '<input type="checkbox" checked class="shelltf" id="batname" style="margin: 10px;">' +
        '<label for="batname" style="font-size: x-large">Add \'.bat\' extension to the created file.</label><br>' +
        '<br><br><input type="button" class="go_button" onclick="multilineConfirmed()" value="Save the Script by this name">';
}


function multilineConfirmed() {
  let scName = String(document.getElementById('script_name').value);
  let executioner = String(document.getElementById('executioner').value);
  if (scName === '') { errorMessage.innerText = 'You have left the Name of Script Field blank.'; return; }
  fs.mkdir('Custom_Scripts', (err) => {
    if (err) {
      return console.log(err);
    }
  },
  );

  scName = (document.getElementById('batname').checked === true) ? (`${scName}.bat`) : scName;

  // Make a new Custom Scripts folder.
  fs.writeFile(`Custom_Scripts\\${scName}`, script,
    (err) => {
      if (err) {
        return console.log(err);
      }
    },
  );

  // Add the script to settings.
  script = `Custom_Scripts\\${scName}`;
  fs.appendFile('settings.dat', (executioner !== '') ? `${executioner} ${script}#${symbol}\n` : `${script}#${symbol}\n`,
    (err) => {
      if (err) { return console.log(err); }
      console.log('Added to settings.');
    },
  );

  // Reload backend with new settings
  shell.openItem('reload.bat');
  // Reload page
  location.replace('#yrscutsection');
  location.reload();
}

function writeToFile() {
  const str = '';
  symbol = document.getElementById('symb').value;
  script = document.getElementById('shellscr').value;

  // Ensure valid non-blank data being sent
  if (symbol === '' || script === '') {
    if (symbol === '' && script === '') { errorMessage.innerText = 'You have left both the Fields blank. Please Enter valid values.'; } else if (symbol === '') { errorMessage.innerText = 'You have not entered the key to be pressed with Num-Lock/Caps-Lock. Please Enter valid value.'; } else { errorMessage.innerText = 'You have not entered the command to be executed. Please Enter valid value.'; }
  }
  // Data is not blank
  else {
    // Last validity checks
    if (symbol.length > 1 || symbol === '0') {
      errorMessage.innerText = 'You have not entered any one valid key. Please Enter valid value between 1-9, a-z etc.';
      return;
    }
    if (strArr.length !== 0) {
      for (let i = 0; i < strArr.length - 1; i++) {
        if (symbol === strArr[i].split('#')[1]) {
          errorMessage.innerText = 'Key Already assigned. Check shortcut list.';
          return;
        }
        if (script === strArr[i].split('#')[0]) {
          errorMessage.innerText = `Shortcut already set to '${strArr[i].split('#')[1]}'. Check shortcut list.`;
          return;
        }
      }
    }

    // If multi-line script
    for (let i = 0; i < script.length; i++) {
      if (script[i] === '\n') {
        prompt();
        return;
      }
    }

    // Write new rule to settings.dat
    fs.appendFile('settings.dat', str.concat(script, '#', symbol, '\n'),
      (err) => {
        if (err) { return console.log(err); }
        console.log('Added to settings.');
      },
    );

    if (strArr.length === 0) { shell.openItem('move_to_startup.bat'); }
    // Reload backend with new settings
    shell.openItem('reload.bat');
    // Reload page
    location.replace('#yrscutsection');
    location.reload();
  }
}


function closeApp() {
  const remote = require('electron').remote;
  const w = remote.getCurrentWindow();
  w.close();
}


function clearFile() {
  const str = '';

  // Deletes Settings.dat
  fs.unlink('settings.dat', (err) => {
    if (err) { return console.log(err); }
    console.log('Cleared Settings.');
  },
  );

  // Reload backend with new settings
  shell.openItem('reload.bat');
  // Reload page
  location.reload();
}


function readFromFile() {
  // Set required values
  const items = document.getElementById('var_list');
  const clearTool = document.getElementById('clear_tool');
  const fs = require('fs');
  const defaultOutput =
      "<p class='section-heading text-uppercase text-center' id='anger' style='color: white;'><span style='font-size: 25px;'>" +
      '<br>THERE ARE NONE. THIS IS DISAPPOINTING.<br>' +
      "<a href='#new_cuts' style='font-size: 30px;'>Get on it!</a><br><br><br>" +
      '</span></p>';
  const tableElementStyle = "style='alignment: center; font-size: 25px; color: #1d2124; border: 2px solid black; background-color: ghostwhite; padding: 15px;'";
  let str = '';
  fs.readFile('settings.dat', 'utf8',
    (err, data) => {
      if (err) {
        // Default Output in Your Shortcuts section
        items.innerHTML = defaultOutput;
        return console.log(err);
      }
      str = String(data);

      // If file is blank, remove file and refresh
      if (str === '') { clearFile(); }

      strArr = str.split('\n');
      let shortcut = '';
      script = '';

      str = `<br><table align='center' ${tableElementStyle}>` +
          '<tr style=\'font-size: 35px; border: 1px solid black; background-color: #1d2124; color: white;\'><td style=\'padding: 0 10px; border: 3px solid black;\'>No.</td><td style=\'padding: 0 12px; border: 3px solid black;\'>SHORTCUT</td><td align=\'center\' style=\'padding: 0 200px; width: fit-content\'>Opens</td></tr>';
      for (let i = 0; i < strArr.length - 1; i++) {
        shortcut = strArr[i].split('#')[1];
        script = strArr[i].split('#')[0];
        str = str.concat(`<tr ${tableElementStyle}>`, `<td ${tableElementStyle}>`, String(i + 1), '</td>', `<td ${tableElementStyle}>`, shortcut, '</td>', `<td ${tableElementStyle}>`, script, '</td>', '</tr>');
      }

      // Output in Your Shortcuts section
      if (str === '') { items.innerHTML = defaultOutput; } else {
        str = str.concat('</font></table>');
        clearTool.innerHTML = "<br><label style='font-size: 30px'>Shortcut number to be deleted: &nbsp; &nbsp; &nbsp; </label>" +
            "<input type='number' class='filefound' id='shortcut_index' required='required' placeholder='>= 1'>" +
            "<p class='help-block text-danger' id='at_index'></p>" +
            "<input type='button' class='go_button filefound' id='delete_button' onclick='clearIndex()' value='Delete this Shortcut'>" +
            "<br><br><input type='button' class='go_button' id='button2' value='Clear all existing Shortcuts' onclick='clearFile()'>" +
            '<br><br><td>Note:</td><td>&nbsp;&nbsp;&nbsp;Num-Lock/Caps-Lock + 0 is reserved for opening this GUI, anytime.</td>';
        items.innerHTML = str;
      }
    },
  );
}


function clearIndex() {
  const index = document.getElementById('shortcut_index').value;
  const fs = require('fs');
  let str = '';
  fs.readFile('settings.dat', 'utf8',
    (err, data) => {
      if (err) {
        // Default Output in Your Shortcuts section
        return console.log(err);
      }
      str = String(data);
      strArr = str.split('\n');
      str = '';
      for (let i = 0; i < strArr.length - 1; i++) {
        if (parseInt(index) === (i + 1)) { continue; }
        str = str.concat(strArr[i], '\n');
      }

      // Check if valid value entered
      if (index === '' || isNaN(index) || parseInt(index) > strArr.length - 1) {
        document.getElementById('at_index').innerText = 'Please enter valid number to delete.';
        return;
      }

      // Write to Settings.dat
      fs.writeFile('settings.dat', str,
        (error) => {
          if (err) { return console.log(error); }
          console.log('Removed from settings.');
        },
      );

      // Reload backend with new settings
      shell.openItem('reload.bat');
      // Reload page
      location.replace('#yrscutsection');
      location.reload();
    },
  );
}
