# GCP Project Demo

## Introduction

This is a non-trivial serverless web application using NodeJS 10 and the following services:

- Web app server (App Engine)
- Task queue (Cloud tasks)
- Backend (App Engine)
- Document database (Cloud Firestore)
- Data warehouse (BigQuery)
- Logging (built into all services)


All aspects of the solution:

- Run hot/hot across 2 or more failure zones
- Automatically scale up and down to handle load
- Automatically manage hot deploy where relevant


Open the link below to see the architecture of the app:


<walkthrough-editor-open-file filePath="etc/docs/images/gcp-serverless-demo.png">
etc/docs/images/gcp-serverless-demo.png
</walkthrough-editor-open-file>



## Installing the app

The assumption is that there is a non-prod, pre-prod and prod environment - as per the setup in the project: 

[https://github.com/mondo-mob/gcp-serverless-demo.git](https://github.com/mondo-mob/gcp-serverless-demo.git)

This guide will describe how to deploy the application manually onto each of these projects - although in reality, 
a build tool such as Bamboo would be used to standardise and automate these builds.

### Build code

As the project uses Node, initially install all the library dependencies

```bash
npm install
```

### Deploy the code

I.e. for a project named `gcp-example` the commands to manually deploy to each environment should be something like
the following (choose the project to set the project id)

<walkthrough-project-setup></walkthrough-project-setup>

Deploy the app (choose each project to deploy to each environment)

```bash
gcloud app deploy --project={{project-id}}
```

## Testing the app

The link below will launch the app (again, choose the project as required)

<walkthrough-project-setup></walkthrough-project-setup>


[https://{{project-id}}.ts.r.appspot.com](https://{{project-id}}.ts.r.appspot.com)


### Pseudo load test

The `parallel` library is required on the console in order to execute simultanious requests - this can be installed 
using:

```bash
sudo apt-get install parallel
```

Then, to demonstrate App Engine auto-scaling, you can run the following:

```bash
seq 1000 | parallel -i -j 60 curl -s -o /dev/null -w "{}:" "https://{{project-id}}.appspot.com/test?load={}"
```

This will create 1000 parallel requests to the application. If you go to the 
[GCP Cloud Console](https://console.cloud.google.com/) and navigate to `App Engine -> Instances`, you will see a number
of additional instances that have been created to handle the load.

Once the test has been completed, if you continue to refresh the page, you will see these instances being scaled 
down. You can also manually delete all these instances if required (although the costs associated with having them 
running are negligible)

You may make a change to the code and redeploy during this simulation to demonstrate the hot deployment feature of 
App Engine.
