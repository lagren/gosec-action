# gosec-action

## How to use

Add `.github/workflows/gosec.yml`:

```yml
name: Example
on:
  - push
jobs:
  test:
    name: Run scan on projects in /example folder
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup go
        uses: actions/setup-go@v2
        with:
          go-version: 1.15
      - name: Without issues
        uses: lagren/gosec-action@v1
        with:
          version: 2.6.1
          working-directory: example/good
```
