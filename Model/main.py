import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from keras.models import Sequential
from keras.layers import Dense

# Load the dataset
data = pd.read_csv('student.csv')

# Drop any rows with NaN values
data = data.dropna()

# Encode categorical columns
categorical_cols = ['Gender', 'Caste']
label_encoders = {}
for col in categorical_cols:
    label_encoders[col] = LabelEncoder()
    data[col] = label_encoders[col].fit_transform(data[col])

# Convert DateOfBirth and SchoolJoiningDate to datetime
data['DateOfBirth'] = pd.to_datetime(data['DateOfBirth'])
data['SchoolJoiningDate'] = pd.to_datetime(data['SchoolJoiningDate'])

# Calculate Age based on DateOfBirth
data['Age'] = (pd.Timestamp.now() - data['DateOfBirth']).apply(lambda x: x.days // 365)

# Drop unnecessary columns
data = data.drop(['Name', 'SchoolJoiningDate', 'StreamAfter10th', 'DateLeftSchool'], axis=1)

# Split the data into features (X) and target (y)
X = data.drop('DropoutPrediction', axis=1)
y = data['DropoutPrediction']

# Check if there are any valid samples left
if len(X) == 0 or len(y) == 0:
    print("Error: No valid samples left in the dataset after preprocessing.")
    exit()

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Random Forest Classifier
rf_classifier = RandomForestClassifier(random_state=42)
rf_classifier.fit(X_train_scaled, y_train)
rf_pred = rf_classifier.predict(X_test_scaled)
rf_accuracy = accuracy_score(y_test, rf_pred)
print("Random Forest Classifier Accuracy:", rf_accuracy)

# Neural Network
model = Sequential()
model.add(Dense(64, activation='relu', input_shape=(X_train_scaled.shape[1],)))
model.add(Dense(64, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train_scaled, y_train, epochs=10, batch_size=32, verbose=1)
nn_loss, nn_accuracy = model.evaluate(X_test_scaled, y_test)
print("Neural Network Test accuracy:", nn_accuracy)