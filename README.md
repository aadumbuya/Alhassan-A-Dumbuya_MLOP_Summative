Emergency Response and Speed Detection System

https://youtu.be/8LqYnDGDD1c

http://localhost:5173/

Overview

The Emergency Response and speed detection System is designed to predict the severity of accidents based on historical data. It utilizes a machine learning model trained using a Decision Tree Classifier to assess accident severity levels.

Project Structure

model.py - Contains the code for training the machine learning model.

prediction.py - Handles accident severity predictions using the trained model.

retraining.py - Allows retraining of the model with updated data.

cleaned.csv - Preprocessed dataset used for training and retraining the model.

frontend/ - React-based frontend interface for user interaction.

Technologies Used

Machine Learning: Decision Tree Classifier (scikit-learn)

Backend: Python

Frontend: React

Data Storage: CSV file (cleaned.csv)

Usage

Training the Model

python model.py

Making Predictions

python prediction.py

Retraining the Model

python retraining.py

Frontend

The frontend is built using React and provides an intuitive interface for users to input accident-related data and receive severity predictions.

Future Improvements

Implement more advanced models for higher accuracy.

Integrate real-time accident data for dynamic predictions.

Enhance the frontend with better visualization and user experience.


