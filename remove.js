// Import necessary modules
let fs = require('fs');

// List files before deleting
getCurrentFilenames();

fs.rm('C:\\Users\\twinkle\\Videos\\Captures\\New Text Document.txt', { recursive:true }, (err) => {
	if(err){
		// File deletion failed
		console.error(err.message);
		return;
	}
	console.log("File deleted successfully");
	
	// List files after deleting
	getCurrentFilenames();
})

// This will list all files in current directory
function getCurrentFilenames() {
	console.log("\nCurrent filenames:");
	fs.readdirSync(__dirname).forEach(file => {
		console.log(file);
	});
}


