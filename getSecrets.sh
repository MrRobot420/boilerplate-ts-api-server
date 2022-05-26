#!/bin/bash
gcloud config set project <PROJECT_ID>
gcloud secrets versions access latest --secret=<SECRET_NAME> --format='get(payload.data)' | tr '_-' '/+' | base64 -d > .secrets.json
