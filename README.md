# Test Results Upload to Snowflake Action

This GitHub Action reads test result JSON files from your repository and uploads them to a Snowflake database.

## Inputs

- `snowflake_account`: The account name for your Snowflake instance.
- `snowflake_username`: The username to authenticate with Snowflake.
- `snowflake_password`: The password to authenticate with Snowflake.
- `snowflake_database`: The database name in your Snowflake instance.
- `snowflake_schema`: The schema name in your Snowflake instance.
- `snowflake_table`: The table name where test results will be inserted.
- `json_file_path`: The path to the JSON file containing test results.

## Outputs

This action doesn't produce any outputs.

## Usage

To use this action, create a workflow file in your repository (e.g., `.github/workflows/test_results_upload.yml`) and define your workflow:

```yaml
name: Upload Test Results to Snowflake

on:
  push:
    branches:
      - main
  pull_request:
    paths-ignore:
      - '**.md')

jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Upload Test Results to Snowflake
      uses: <your-github-username>/test-results-upload-action@<version>
      with:
        snowflake_account: ${{ secrets.SNOWFLAKE_ACCOUNT }}
        snowflake_username: ${{ secrets.SNOWFLAKE_USERNAME }}
        snowflake_password: ${{ secrets.SNOWFLAKE_PASSWORD }}
        snowflake_database: ${{ secrets.SNOWFLAKE_DATABASE }}
        snowflake_schema: ${{ secrets.SNOWFLAKE_SCHEMA }}
        snowflake_table: ${{ secrets.SNOWFLAKE_TABLE }}
        report_json_file_path: './path/to/your/test_results.json'
