# Google Sheets What-If Community Connector by Data Studio Labs

We’re excited to announce that our “Hack” for the Google Cloud BI Hackathon 2022 is now ready for the Looker Studio community. The speciality of this community connector is that we can get the maximum use of Google Sheets data modelling features right inside Looker Studio.

# Example Use Cases

We will go over some example use cases for this Community Connector in the following sections. These would include demo dashboards that we created & also a quick step-by-step tutorial on how you can get started.

## Scenario Manager
Scenario manager for Looker Studio allows you to change or substitute input values for multiple cells in a Google Sheet (in this Hackathon we have limited it to 6, but we can make it to something like 32 cells just like in Microsoft Excel). Our hack was to create a Looker Studio Community Connector which will help you view the results of different input values or different scenarios at the same time. These input values (parameters) will be passed to a Google Sheet which will then do a series of complex calculations before it returns data back to Looker Studio. Some refer to this as What-If analysis as well.

To use our [Google Sheets What-If connector](https://lookerstudio.google.com/datasources/create?connectorId=AKfycbyVL6ToIjUGJBE7xP6aF7TlEjicyXJympF_8QVrS4M) we basically have to follow the following 3 steps:

1. We have to create a Google Sheets spreadsheet model with various different calculations. These calculations can be anything from simple adding or subtracting to complex LAMBDA functions.

2. Once we create the Google Sheets model, now we're ready to connect to Looker Studio using our Google Sheets What-If Connector. We start by either selecting the Google Sheet from a dropdown or by entering the Google Sheets ID directly. Once we do that, our community connector will let you select a specific tab from your Google Sheet. Now we're ready to setup all default parameters. We can opt-in to allow these parameters while we view the Looker Studio dashboard.

3. We can now start building the Looker Studio dashboard as we usually do with the regular Google Sheets connector by Google. But the real magic starts when we pull in some of the parameters to our Looker Studio canvas ([watch the short video below](https://youtu.be/ARMQLh0tyA4))

## Setting up a Currency Converter using our Community Connector

 - **Step 1** - Create the Google Sheet as you usually do with all the regular formulas and calculations. I am going to create a Google Sheet data model which can tell us the historical values of a given currency pair. Eg. USDGBP
 **![](https://lh4.googleusercontent.com/encNfxD_oHlie1lRfbPk-h04gBy9QOCJ0-y5nnHmpRJOnZzFnoHmgC3cjJ3dsuzOescrTT28KD94SbIY11S4ZmdVktGZc4zd5v1VNk-IOEfbCgg6pi1au9erbEbFFGIjGZhmo1_fgUdCm47nTm-VPFIpyfz7KubIqtL93VCYjLVD0GxpuCksU0cH2s-v0w)** <br><br>
 - **Step 2** - Create a data source for the above sheet using our [Google Sheets What-If community connector](https://lookerstudio.google.com/datasources/create?connectorId=AKfycbyEmVrF3d8UOh4dkFvsjVjnPvjvqxz0ugeyr1e0XzI4). 
Start with this option & click "Next". <br>
**![](https://lh4.googleusercontent.com/STpz_V3TzLnMpw-l4UZL76JIP0jeHvZoaFc6JOfFc6YuuDQXuFH1UxAFNYfgnoZsybPHDfahucBAYAyoaZiKhV2jVufT9wgoL6vgVcANqEQSfAlXYfXbDU2QtKJdnbsOMtGFqhw4ggcM-oNI1jeXtKsty8ljEPYcgNi64fu4dOa5RbrgmBNCNHGVTy3gSA)** <br>
Now in the next screen select your Google Sheet from the list and click "Next". <br>
**![](https://lh4.googleusercontent.com/tsgBpNaz-q-RJeZEqGs7Lz0IEu7foTkKXL4XkgoaaEohzpJQlsIYaYzdnDr6OHpmRhlzapT97B0Ul9IzyuReS-xJDKrgPiffkxKiOYyLibr6zpjDjVryRGk3LqyK4VOyjjg-FBj0aYcMwEPxlXeyC1qzXD92snp3c50HPIH-4t9om9Hahb7fhFepmtrFLw)**<br>
Now we have to set some settings as follows and click the "Connect" button at the top-right.<br>
**![](https://lh6.googleusercontent.com/mzPiJtTRJPJAZIfLV7JUCvHt92GFN4x29WMtj89dbEPL7eB00jfsIAmdyPowofVDSWq3u6jftJr0_kfRyX33l62QoYyKITZvrZSB-66xB57d2fJl8sT5f9rEZTYgfG8hAu3ix7qGr47ijaG_Z22WuVTwBIBgoIGvr2ELOqBb2OIhgcajyB8-dLic7q9xBQ)**<br>
Let’s rename our parameter 1 & 2 to read as "From Currency" and "To Currency", respectively. Also let’s make the "Close" dimension to the type Number. Now we’re ready to create our report. So click “Create Report”.
**<br>![](https://lh4.googleusercontent.com/hLvkLhr7DUSOmSQ4yG6UdvkTtXAF6UW_UN9JCIEww90Pl8DVxJxxyHaIBwaSA3fEE-FBJW1-4wq-LjfZxJfMgm67-IImTwQtXCB220M0k6xqD3FdmqbzT3lOJbIwNrZrmeRku4OKl2cwQGIBa2k4F6yrCgmnMOg5eEmkw3LjPhjf2T8eR7vOUnYgw7gBMQ)**<br>
We will now have a Looker Studio dashboard similar to the following:<br>
**![](https://lh3.googleusercontent.com/NZojkHGU0JS1ndwDDtwWHy0AJYC6Xwy76fSRzFABHBzSDKioBKbSetVwrCHURLbZoysDd64N1TgvWc1qX97L3eSmqiBh24ObFzo9QSINtmVKHu68zaJ_BH-rHx24mktOHreDrT8qQH3Q3vFyRpdZIVcFG_iLJQDnc_v3RpKtn4PUlUNBWqchMJon84zL2Q)** <br><br>
- **Step 3** - Let’s now go back to our Google Sheet. You will see cells ```C1```, ```D1``` and ```E1``` are now populated with some values. These are actually the values passed from the Looker Studio to Google Sheets through our community connector.
**<br>![](https://lh6.googleusercontent.com/FItbMPX0V_ULCghCMs4cHRuv_2TMCpnVzHBTP97egX8vQX8Xect8ZwEMm_Ifxr7y8vbYnTHEbX1EDdjlBlLvTfvrGCxf9npeDOAMKccHzirAI0pnLaChkY4RDD7TrMleMXWJVW23tze1ju9h8vh62c8cK0ePimD5bh1PzA7vEFlxZXZ4qLpUd-Mpt_HVTg)** <br><br>
- **Step 4** - We’re going to link cells ```C1```, ```D1``` and ```E1``` to cells ```B2```, ```B3```, ```B4``` and ```B5``` using some simple formulas.
Write the following formulas in each of the specified cells:<br><br>
In ```B2``` write
```=index(split(E1,";"),1,1)```<br>
In ```B3``` write
```=index(split(E1,";"),1,2)```<br>
In ```B4``` write
```=C1```<br>
In ```B5``` write
```=D1```<br><br>
- **Step 5** - Let’s now revert back to our Looker Studio dashboard and drag the two parameter fields into the dashboard. We can also add a date range control. Your dashboard will now look like the following.
**<br>![](https://lh6.googleusercontent.com/IFBX32bVqz7AwfeGN3lqn2kAJoSkEKvUIME3Igv-nfWeYGf8b7UCSD40gEX_XNPp5PeNYrTaaHHfD0Y7lMydIdKpnzh9EELmvDg1ZqUG31xY-51t0DlfU7FqE8SJtu_qOgZnqB7r6tv5H7XqJYz9CqAvAt62eMLDZpW9958lGf371CIc_bpyxf23GFWBOQ)**<br><br>
- **Step 6** - Now you can play with some values for the 2 currency codes and data range control.
Take a look at the following demo dashboard to see how the above "Hack" can be used in various different complex use-case scenarios.<br>
Link to the dashboard - https://lookerstudio.google.com/s/gSILkfNhSfc




## Quick Help Video
You can have a look at the following quick help video incase you're not familiar with how Looker Studio & Looker Studio Community Connectors work.

[![IMAGE_ALT](https://img.youtube.com/vi/ARMQLh0tyA4/maxresdefault.jpg)](https://youtu.be/ARMQLh0tyA4)

## Live Demos of  Looker Studio Dashboards using this community connector
- [Scenario Manager Demo Dashboard](https://lookerstudio.google.com/s/iPrdyrewLig) ([*Google Sheet Containing the Data*](https://docs.google.com/spreadsheets/d/1MBq3xxq5251VLIIx_b4Fzl2MzfJAhbp1kJ75ylb0D64/edit?usp=sharing))
- [GOOGLEFINANCE Example (with Advanced Monte Carlo Simulation)](https://lookerstudio.google.com/s/oJKobMxaqVs) - This example is a kind of mind-blowing use case as this shows you how we can use our Google Sheets What-If community connector to run some advanced simulations in Google Sheets using Monte Carlo Simulation and return the results to Looker Studio in just the click of a button. We're hoping with our Google Sheets What-If connector, the Looker Studio community will have some great use of these kinds of extreme use cases. Just imagine running some Monte Carlo simulation for one of your advertising campaigns to decide the best mix of channels brings you the highest ROI?

- [Organic Traffic Forecasting Demo Dashboard](https://lookerstudio.google.com/s/iH6EAmtok_8) ([*Google Sheet Containing the Data*](https://docs.google.com/spreadsheets/d/1qnYqxEZxNvmTesLIv-8PWTOVca495RwfGNneMM4lVbE/edit?usp=sharing))
