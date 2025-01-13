# Financial Filtering App
A full-stack financial filtering app built with React for the frontend and Flask for the backend.

## Prerequisites
Node.js (v20.18.0 or higher)
npm (v11.0.0 or higher)
Python (3.8 or higher)
pip (Python package installer)
#Running the Project Locally
### Step 1: Clone the Repository
Copy code
git clone https://github.com/yourusername/financial-filtering-app.git
cd financial-filtering-app
### Step 2: Setup the Backend
Navigate to the backend folder:
Copy code
cd backend
Create and activate a Python virtual environment (optional but recommended):

Copy code
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
Install backend dependencies:

Copy code
pip install -r requirements.txt
Start the Flask development server:

Copy code
flask run
By default, the backend will be available at http://127.0.0.1:5000.

### Step 3: Setup the Frontend
Navigate to the frontend folder:

Copy code
cd ../frontend
Install frontend dependencies:

Copy code
npm install
Start the React development server:

Copy code
npm start
By default, the frontend will be available at http://localhost:3000.

### Step 4: Access the Application
Open your browser and visit http://localhost:3000. The frontend should connect to the backend API running at http://127.0.0.1:5000.

## Folder Structure
css
Copy code
financial-filtering-app/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
└── README.md
## Notes
Ensure both the backend and frontend servers are running simultaneously.
Update the backend URL in the frontend if necessary (e.g., during deployment).
Let me know if you'd like to include deployment instructions or additional details!
