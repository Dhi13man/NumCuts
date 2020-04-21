let str_arr=[];

function write_to_file() {
	const fs = require("fs");
	let str = '';

	// Store symbol and shell script to file settings.dat
	const symbol = document.getElementById("symb").value;
	const script = document.getElementById("shellscr").value;
	const err_msg = document.getElementById("shell_symb");

	// Ensure valid data being sent
	if (symbol === '' || script === '') {
		if (symbol === '' && script === '')
			err_msg.innerText = "You have left both the Fields blank. Please Enter valid values.";
		else if (symbol === '')
			err_msg.innerText = "You have not entered the key to be pressed with Num Lock. Please Enter valid value.";
		else
			err_msg.innerText = "You have not entered the command to be executed. Please Enter valid value.";
	}
	// Data is not blank
	else {
		// Two last validity checks
		if (symbol.length > 1) {
			err_msg.innerText = "You have not entered any one valid key. Please Enter valid value.";
			return;
		}

		if (str_arr.length !== 0) {
			for (let i = 0; i < str_arr.length - 1; i++) {
				if (symbol === str_arr[i].split("#")[1]) {
					err_msg.innerText = "Key Already assigned. Check shortcut list.";
					return;
				}
			}
		}

		// Write new rule to settings.dat
		fs.appendFile('settings.dat', str.concat(script, '#', symbol, '\n'),
			function (err) {
				if (err)
					return console.log(err);
				console.log('Added to settings.');
			}
		);

		// Reload page
		location.replace('#yrscutsection')
		location.reload();
	}
}


function clear_file(){
    const fs = require("fs");
	let str = '';

	// Deletes Settings.dat
	fs.unlink('settings.dat', function (err) {
												if (err)
													return console.log(err);
												console.log('Cleared Settings.');
											}
			);

	// Reload page
	location.reload();
}


function read_from_file(){
	// Set required values
	let items = document.getElementById("var_list");
	let clear_tool = document.getElementById("clear_tool");
	const fs = require("fs");
	let default_output =
		"<p class='section-heading text-uppercase' align='center' id='anger' style='color: white;'><span style='font-size: 25px;'>" +
				"<br>THERE ARE NONE. THIS IS DISAPPOINTING.<br>" +
				"<a href='#shortcuts' style='font-size: 30px;'>Get on it!</a><br><br><br>" +
		"</span></p>";
	let table_ele_style = "style='alignment: center; font-size: 25px; color: #1d2124; border: 2px solid black; background-color: ghostwhite; padding: 15px;'";
	let str = '';
	fs.readFile('settings.dat', 'utf8',
			function (err, data){
						if (err) {
							// Default Output in Your Shortcuts section
							items.innerHTML = default_output;
							return console.log(err);
						}
						str = String(data);

						// If file is blank, remove file and refresh
						if (str === '')
							clear_file();

						let str_arr = str.split('\n');
						let shortcut = "", script = "";

						str = "<br><table align='center' " + table_ele_style + ">" +
							"<tr style='font-size: 35px; border: 1px solid black; background-color: #1d2124; color: white;'><td style='padding: 0 10px; border: 3px solid black;'>No.</td><td style='padding: 0 12px; border: 3px solid black;'>SHORTCUT</td><td align='center' style='padding: 0 200px; width: fit-content'>Opens</td></tr>";
						for (let i = 0; i < str_arr.length - 1; i++) {
							shortcut = str_arr[i].split('#')[1];
							script = str_arr[i].split('#')[0];
							str = str.concat("<tr " + table_ele_style + ">", "<td " + table_ele_style + ">", String(i+1), "</td>", "<td " + table_ele_style + ">", shortcut, "</td>", "<td " + table_ele_style + ">", script, "</td>", "</tr>");
						}

						// Output in Your Shortcuts section
						if (str === '')
							items.innerHTML = default_output;
						else {
							str = str.concat("</font></table>")
							clear_tool.innerHTML = "<br><label style='font-size: 30px'>Shortcut number to be deleted: &nbsp; &nbsp; &nbsp; </label>" +
								"<input type='text' class='filefound' id='shortcut_index' required='required' placeholder='>= 1'>" +
								"<p class='help-block text-danger' id='at_index'></p>" +
								"<input type='button' class='go_button filefound' id='delete_button' onclick='clear_index()' value='Delete this Shortcut'>" +
								"\<br><br><input type='button' class='go_button' id='button2' value='Clear all existing Shortcuts' onclick='clear_file()'>";
							items.innerHTML = str;
						}
					}
				);
}


function clear_index() {
	const index = document.getElementById("shortcut_index").value;
	const fs = require("fs");
	let str = '';
	fs.readFile('settings.dat', 'utf8',
		function (err, data) {
					if (err) {
						// Default Output in Your Shortcuts section
						return console.log(err);
					}
					str = String(data);
					str_arr = str.split('\n');
					str = '';
					for (let i = 0; i < str_arr.length - 1; i++) {
						if (parseInt(index) === (i + 1))
							continue;
						str = str.concat(str_arr[i], '\n');
					}

					// Check if valid value entered
					if (index === '' || isNaN(index) || parseInt(index) > str_arr.length - 1) {
						document.getElementById('at_index').innerText = "Please enter valid number to delete."
						return;
					}

					// Write to Settings.dat
					fs.writeFile('settings.dat', str,
						function (err) {
							if (err)
								return console.log(err);
							console.log('Removed from settings.');
						}
					);

				// Reload page
				location.replace('#yrscutsection')
				location.reload();
			}
	)

}