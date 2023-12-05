# final_project

## To run the project:

### 1. Code Execution Environment

a. Libraries that need to be installed to run the code:

- torch
- torchvision
- scikit-learn
- matplotlib

Installation:

```
pip install torch torchvision scikit-learn matplotlib
```

b. Project Setup:

- Clone the repository to your local machine.
- Place the "Data" folder into the "src" directory of the project.

The dataset ("Data" folder) utilized in this project is the 'Brain tumors 256x256' dataset, available for download [here](https://www.kaggle.com/datasets/thomasdubail/brain-tumors-256x256/code).

### 2. Running the Code

a. Training the Model:

- Execute the `model_train.py` file to train the model. This process may take several minutes. Upon completion (approximately 10 minutes), a new file named tumors_model will be generated.

b. Testing the Model:

- Run the `model_test.py` file to assess the model. The conclusion will feature essential graphs and a confusion matrix. Additionally, a classification report will be printed.
