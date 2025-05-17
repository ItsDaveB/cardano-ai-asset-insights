# GCP Provider Setup

This guide explains how to set up a GCP service account for use with Gemini via Vertex AI and configure your project to authenticate properly.

## 1. Create a GCP Project (if needed)

1. Go to https://console.cloud.google.com/
2. Click the project dropdown at the top and select "New Project"
3. Give it a name and create it

## 2. Enable Vertex AI API

1. In the Cloud Console, navigate to:
   `APIs & Services > Library`
2. Search for "Vertex AI API"
3. Click "Enable"

## 3. Create a Service Account

1. Go to IAM & Admin > Service Accounts:
   https://console.cloud.google.com/iam-admin/serviceaccounts
2. Click "Create Service Account"
3. Name it (e.g., `vertexai-service-account`) and add an optional description
4. Click "Create and Continue"

### Assign Roles

Add the following roles:

- Vertex AI User
- (Optional) Viewer or Editor, depending on your use case

Click "Done"

## 4. Generate a Key File

1. In the Service Accounts list, click the three dots next to your account
2. Select "Manage Keys"
3. Click "Add Key" > "Create new key"
4. Choose **JSON** format and click **Create**
5. A `.json` file will download to your machine

## 5. Update the Example Key File

After downloading the JSON key file, open the following example file in your project:

```
src/services/llm/providers/gcp/gcp-service-account.example.json
```

Fill in the empty values using the corresponding fields from your downloaded service account key.  
Once completed, rename the file to remove the `.example` suffix so it becomes:

```
gcp-service-account.json
```
