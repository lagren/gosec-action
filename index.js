const tc = require('@actions/tool-cache');

const gosecPath = await tc.downloadTool('https://github.com/securego/gosec/releases/download/v2.6.1/gosec_2.6.1_linux_amd64.tar.gz');
const gosecExtractedFolder = await tc.extractZip(gosecPath, 'gosec');
