---
title:  'Tranditional Statistical Learning: Classification in Self-Assessed Financial Health Status'
summary: Using German General Social Survey (ALLBUS), this project tend to classify the survey's responses into one of the five categories from 1 to 5 which represent the "self-asset financial health" of samples.
tags:
  - project
date: 2022-01-01
links:
  - icon: github
    icon_pack: fab
    name: code
    url: https://github.com/joeliang0520/FinanceStatus
  - name: dataset
    url: https://www.gesis.org/en/allbus/allbus-home/general-information

---

## Disclaimer

This project is an improvement of the final project of the upper-year Statistic course "STAT441: Statistical Learning - Classification" at the University of Waterloo by Bolun Cui and Joe Liang. 

## Video

A video explaination about this project can be found [here](https://youtu.be/LncR2eTuaW8). (Note: The video was made for the university course project, some parts in the video might not be matched with the file)

## Background

The dataset in this project corresponds to the responses in the [German General Social Survey (ALLBUS)](https://www.gesis.org/en/allbus/allbus-home/general-information) between 2005 and 2019. The target variable for machine learning is the last variable "health". It is an ordinal variable with five categories from 1 to 5 and represents the "self-asset financial health" of each survey response.

There are two parts of the dataset, ”train.csv" and "test.csv". the samples in ”train.csv" include "health" variables, which are used for model training. And "test.csv" does not have the "health" variable. The goal of this project is to train a classification model using the "train.csv" to classify survey responses in "test.csv" into one of the financial health categories.

## Highlights

Compelete documentation can be found in the "Supervised Learning code.rmd" file

### Exploratory Data Analysis

- Outlier anaylsis

![Screen Shot 2022-05-09 at 6 39 19 PM](https://user-images.githubusercontent.com/50597009/167510234-a40d0857-18ba-49ab-9211-a77439907923.png)
- Target variables distribution anaylsis and normalization

![Screen Shot 2022-05-09 at 6 43 30 PM](https://user-images.githubusercontent.com/50597009/167510495-4e9d4185-cff5-4c59-8182-0ef97cfe02a8.png)

### Feature Engineering

During analysis, based on our domain knowledge, we derived a new x-variable: the average living space in m2 per person in the household.

### Random Foresting

- Out of Bag (OOB) samples tuning for number of variables to choice and number of trees

![Screen Shot 2022-05-09 at 6 59 31 PM](https://user-images.githubusercontent.com/50597009/167512133-90c355a2-6c07-428c-a0f7-16f52dadebda.png)
- Importance of variables from OOB (randomly mix each variables to test the decrease in accuracy)

![image](https://user-images.githubusercontent.com/50597009/167512382-42b851ae-18c9-4aed-aecd-d52827a579c1.png)
- Tracing the perfomance of different number of trees

![ezgif-5-6cdd33b368](https://user-images.githubusercontent.com/50597009/167513470-1775942b-3a12-40d8-a8e1-b487fae8f6c3.gif)

### Neural Network

- Pipline implentation of two hidden layers neural network

![pip](https://user-images.githubusercontent.com/50597009/167514019-340214b8-ed37-49ac-b301-653565b66ac0.gif)

- Tuning Epochs (number of iteration) to balance bias and vairance tradeoff

![neural](https://user-images.githubusercontent.com/50597009/167511333-45ce2f77-87f2-42df-a84e-372223eaca53.gif)
- Number Nodes and Layer tuning with validation cross entropy

![image](https://user-images.githubusercontent.com/50597009/167513662-b1bc3c49-a2f1-4192-96d8-fbb189e31487.png)
![image](https://user-images.githubusercontent.com/50597009/167514574-f7be8d49-a08a-4911-8820-7f718171eabb.png)

## Performance of the Model

![image](https://user-images.githubusercontent.com/50597009/167514689-ae11686b-a180-4d94-84a5-35e78f941d42.png)


## Enviorment

This project uses R with R markdown for better visualization. Please visit the official websites for documentation and installation of [R](https://www.r-project.org/), and [R Markdown](https://rmarkdown.rstudio.com/). [R studio](https://www.rstudio.com/) is recommended to open the .rmd file.

The required packages to excuate the code in .rmd file are listed below and can be installed in CRAN using

```bash
install.package("package_name")
```
in R or R studio.

- randomForest: a comprehensive package for Random Forest Model training
- caret: a machine learning platform with many integrated features, such as cross-validation
- fastDummies: a package allows you to convert categorical variables into indicator (Dummy) variables
- Keras: a comprehensive package under Tensorflow for Neural Network (Tensorflow installation is required)
- gbm: the Generalized Boosting Model is supported
- nnet: the Multinomial logistic regression model is supported
