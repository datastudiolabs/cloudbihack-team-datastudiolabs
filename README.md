# Google Sheets What-If Community Connector

## Repository Description
This repository contains code related to the Google Apps Script that was used to create a Looker Studio Community Connector which is our project for the Google Cloud BI Hackathon 2022.

## Introduction to Scenario Manager
Scenario manager for Looker Studio allows you to change or substitute input values for multiple cells in a Google Sheet (in this Hackathon we have limited it to 6, but we can make it to something like 32 cells just like in Microsoft Excel). Our hack was to create a Looker Studio Community Connector which will help you view the results of different input values or different scenarios at the same time. These input values (parameters) will be passed to a Google Sheet which will then do a series of complex calculations before it returns data back to Looker Studio. Some refer to this as What-If analysis as well.

To use our [Google Sheets What-If connector](https://lookerstudio.google.com/datasources/create?connectorId=AKfycbyVL6ToIjUGJBE7xP6aF7TlEjicyXJympF_8QVrS4M) we basically have to follow the following 3 steps:

1. We have to create a Google Sheets spreadsheet model with various different calculations. These calculations can be anything from simple adding or subtracting to complex LAMBDA functions.

2. Once we create the Google Sheets model, now we're ready to connect to Looker Studio using our Google Sheets What-If Connector. We start by either selecting the Google Sheet from a dropdown or by entering the Google Sheets ID directly. Once we do that, our community connector will let you select a specific tab from your Google Sheet. Now we're ready to setup all default parameters. We can opt-in to allow these parameters while we view the Looker Studio dashboard.

3. We can now start building the Looker Studio dashboard as we usually do with the regular Google Sheets connector by Google. But the real magic starts when we pull in some of the parameters to our Looker Studio canvas ([watch the short video below](https://youtu.be/ZBoFvaWr-Dk))


## Quick Help Video
You can have a look at the following quick help video incase you're not familiar with how Looker Studio & Looker Studio Community Connectors work.

[![IMAGE_ALT](https://img.youtube.com/vi/ZBoFvaWr-Dk/maxresdefault.jpg)](https://youtu.be/ZBoFvaWr-Dk)

## Resources
- [Scenario Manager Demo Dashboard](https://datastudio.google.com/s/iPrdyrewLig)
- [Google Sheet Containing the Data](https://docs.google.com/spreadsheets/d/1MBq3xxq5251VLIIx_b4Fzl2MzfJAhbp1kJ75ylb0D64/edit?usp=sharing)
