const core =require('@actions/core');

console.log(process.env)
var PSFileToRun = "main.ps1";
process.env['GITHUB_ACTION_PATH'] = process.env.HOME+"/work/_actions/"+process.env.GITHUB_ACTION_REPOSITORY+"/"+process.env.GITHUB_ACTION_REF;

console.log('Constructed github action path: '+process.env.GITHUB_ACTION_PATH)

var spawn = require("child_process").spawn,child;
child = spawn("pwsh",[process.env.GITHUB_ACTION_PATH+"/"+PSFileToRun]);
child.stdout.on("data",function(data){
    process.stdout.write("" + data);
    core.notice("Issue Count by Severity: " + process.env.ISSUE_COUNT_BY_SEV);
});
child.stderr.on("data",function(data){
    process.stdout.write("Powershell Errors: " + data);
    core.error("" + data);
    core.notice("Issue Count by Severity: " + process.env.ISSUE_COUNT_BY_SEV);

    process.exit(1);
});
child.on("exit",function(){
    process.stdout.write("Powershell Script finished");
});
child.stdin.end(); //end input
