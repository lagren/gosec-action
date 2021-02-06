async function run() {
    const tc = require('@actions/tool-cache');
    const exec = require('@actions/exec');
    const core = require('@actions/core');

    const version = core.getInput("version")

    let path = tc.find('gosec', version);

    if (path === "") {
        const gosecPath = await tc.downloadTool(`https://github.com/securego/gosec/releases/download/v${version}/gosec_${version}_linux_amd64.tar.gz`);
        const gosecExtractedFolder = await tc.extractTar(gosecPath, 'gosec');
        path = await tc.cacheDir(gosecExtractedFolder, 'gosec', version);
    }

    // OPTIONS:
    //
    //   -conf string
    //         Path to optional config file
    //   -confidence string
    //         Filter out the issues with a lower confidence than the given value. Valid options are: low, medium, high (default "low")
    //   -exclude string
    //         Comma separated list of rules IDs to exclude. (see rule list)
    //   -exclude-dir value
    //         Exclude folder from scan (can be specified multiple times)
    //   -fmt string
    //         Set output format. Valid options are: json, yaml, csv, junit-xml, html, sonarqube, golint, sarif or text (default "text")
    //   -include string
    //         Comma separated list of rules IDs to include. (see rule list)
    //   -log string
    //         Log messages to file rather than stderr
    //   -no-fail
    //         Do not fail the scanning, even if issues were found
    //   -nosec
    //         Ignores #nosec comments when set
    //   -nosec-tag string
    //         Set an alternative string for #nosec. Some examples: #dontanalyze, #falsepositive
    //   -out string
    //         Set output file for results
    //   -quiet
    //         Only show output when errors are found
    //   -severity string
    //         Filter out the issues with a lower severity than the given value. Valid options are: low, medium, high (default "low")
    //   -sort
    //         Sort issues by severity (default true)
    //   -tags string
    //         Comma separated list of build tags
    //   -tests
    //         Scan tests files
    //   -version
    //         Print version and quit with exit code 0

    core.addPath(path);

    // let myOutput = '';
    // let myError = '';

    const options = {
        ignoreReturnCode: true,
    };
    // options.listeners = {
    //     stdout: (data) => {
    //         myOutput += data.toString();
    //     },
    //     stderr: (data) => {
    //         myError += data.toString();
    //     }
    // };
    options.cwd = core.getInput("working-directory");

    const argString = core.getInput("args")

    const args = argString.split(" ")

    const code = await exec.exec("gosec", args, options)

    // console.log(code)

    if (code > 0) {
        core.setFailed("Issues found in code")
    }

}

run()
