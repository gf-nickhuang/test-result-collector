import * as core from '@actions/core';
import fs = require('fs');
import apiTest from './api-test';

(async () => {
    try {
        const filepath: string = core.getInput('report_json_file_path');
        const source: string = core.getInput('report_source');
        console.log(`File path: ${filepath}`);
        const time: string = new Date().toTimeString();
        core.setOutput("time", time);

        const githubToken: string = core.getInput('github_token', { required: true });
        const octokit: Octokit = new Octokit({ auth: githubToken });

        const payload = await octokit.actions.getRepo(context.repo, { headers: { accept: 'application/vnd.github.v3+json' } });
        console.log(`The event payload: ${JSON.stringify(payload.data)}`);

        if (source === 'api-test') {
            await apiTest().parseAndReformat();
        }

        await uploadData(filepath);
    } catch (error) {
        core.setFailed(error.message)
    }
})();
