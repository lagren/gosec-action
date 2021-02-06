const core = require('@actions/core');

test('lala', async () => {
    process.env['INPUT_ARGS'] = "./..."

    const argString = core.getInput("args")

    const args = argString.split(" ")

    expect(args).toStrictEqual(['./...'])
});
