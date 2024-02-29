const path = require("path");
const { spawn } = require("child_process");

const terraformController = {
    getTerraformApply: (req, res) => {
        // myproject/terraform/main.tf 파일 경로
        const mainTfPath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "terraform",
            "main.tf"
        );

        // 'terraform apply' 명령 실행
        const terraformProcess = spawn(
            "terraform",
            ["apply", "-auto-approve"],
            {
                cwd: path.dirname(mainTfPath),
            }
        );

        // 명령 실행 결과를 웹 브라우저로 전송
        terraformProcess.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
            res.write(data);
        });

        terraformProcess.stderr.on("data", (data) => {
            console.error(`stderr: ${data}`);
            res.write(data);
        });

        terraformProcess.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
            res.end();
        });
    },
};

module.exports = terraformController;
