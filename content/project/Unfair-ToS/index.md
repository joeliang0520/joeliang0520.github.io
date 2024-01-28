---
title: Unfair-ToS
subtitle: A GPT-Based Unfair Term Of Service Detector
summary: A GPT-Based Unfair Term Of Service Detector
tags:
  - NLP
  - Machine Learning
date: "2023-09-01"
profile: true
layout: table-of-contents
show_date: false
---

The [Github Repo](https://github.com/joeliang0520/Unfair-ToS) contains the training datasets, source codes, prompts, and other usefull analysis about this project.

## Introduction

Terms of service (ToS) are agreements between service providers and their users. These ToS documents often contain complex legal language that users struggle to understand. Such clauses may violate consumer laws, compromise users' rights, and raise privacy concerns.

The Large Language Model's (LLM) proven ability to efficiently extract summaries from complex texts makes it ideal for addressing ToS complexities. The Unfair-ToS employs a GPT-based framework to highlight crucial ToS sentences, offer simplified explanations, and evaluate their fairness, also providing reasons for any unfair terms.

## Model Architecture

![Add a little bit of body text (1) (1)](https://github.com/joeliang0520/Unfair-ToS/assets/50597009/9993fc4a-9042-4100-b9ed-93859384475d)

This model leverages GPT-4 through prompts to highlight sentences and generate simplifications for each highlighted sentence from the input, cleaned Terms of Service (ToS). The prompt used in our model has been fine-tuned using 11 ToS documents, comprising approximately 1500 sentences, through prompt engineering. GPT-4 identifies important sentences, and these serve as input to the text classification model.

Each sentence undergoes tokenization using HuggingFace's predefined 'GPT2' tokenizer and is then fed into the pre-trained 'gpt2' model. This model has been fine-tuned on a dataset of 100 ToS using the same tokenizer and padded to the maximum length. The output of the model falls into one of five classes. The purpose of this model is to assign a label to each highlighted sentence, assisting users in identifying the fairness of sentences.

## Model Showcase

### Report

{{% staticref "files/Unfair-ToS.Report.pdf" "newtab" %}}Please read our report{{% /staticref %}} to learn more about our project motivation, background information, and model evaluation.

### Some highlight

Inspired by Yoon Kim's paper, we implemented a baseline CNN classification model with k1 = 4 and k2 = 4 for fair/unfair classification. However, its F1 score is only 0.193, indicating a bias towards classifying samples into the class with the majority, which is the 'fair' class. Consequently, the baseline CNN struggles to accurately identify 'unfair' sentences within the samples. 

<p align="center">
<img src="https://github.com/joeliang0520/Unfair-ToS/assets/50597009/dbff8063-99d6-4515-a139-88e42efc5f92" alt="drawing" width="900"/>
</p>

In contrast, our fine-tuned GPT-2 model surpasses the baseline in both metrics. These findings suggest that the GPT-2 model exhibits greater resilience to class imbalance, particularly when 'fair' sentences dominate the corpus, as is often the case.

<p align="center">
<img src="https://github.com/joeliang0520/Unfair-ToS/assets/50597009/9d9a30b3-f4fc-40f3-b49a-e25725edf6a0" alt="drawing" width="700"/>
</p>

## Current Work
We are presently developing a Graphic User Interface to showcase the capabilities of our model. An early beta version is now accessible in the Application folder, enabling users to upload a (txt/csv) file or copy and paste the Terms of Service (ToS) document. This allows the application of our Language Model (LLM) prompts with various models using your personal OPENAI API keys, yielding highlighted text results. The fair/unfair classification feature will be integrated into the GUI in a future release.

![Screenshot 2024-01-14 at 11 31 06 PM](https://github.com/joeliang0520/Unfair-ToS/assets/50597009/57137b42-7cf6-4219-bfbc-0f27a09a491b)

To utilize this GUI, kindly clone this repository into your local machine and install any missing packages. Following the completion of all preparations, execute the 'GUI.py' file to initiate the application.

We have provided a demo Terms of Service (ToS) document for you to experiment with using our GUI. Please click the "SHOW DEMO" button for more information about this demonstration. If you wish to highlight your own ToS document, you must obtain an OpenAI API key (with sufficient credits based on the length of the ToS and the selected model) and upload it using the SETTING function.

**Note: This version is an early beta release. Please use it at your own risk. We are not liable for any costs or information leaks incurred while using our services.**

We also welcome any contributions to assist us in completing the front-end design!
