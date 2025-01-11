from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

API_KEY = "NdwazWP4jzyvDUWHOzP1RfFuqshEQzzx"
BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL"

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        # Fetch data from external API
        response = requests.get(f"{BASE_URL}?period=annual&apikey={API_KEY}")
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from the external API"}), 500
        
        data = response.json()

        # Sorting
        sort_by = request.args.get('sort_by', None)
        order = request.args.get('order', 'asc')
        reverse = False
        
        if order == 'desc':
            reverse = True
        
        if sort_by:
            # Ensure sorting works only on valid fields
            if sort_by not in ['date', 'revenue', 'netIncome', 'grossProfit', 'eps', 'operatingIncome']:
                return jsonify({"error": f"Invalid sort field: {sort_by}"}), 400
            data = sorted(data, key=lambda x: x.get(sort_by, 0), reverse=reverse)

        # Filtering
        filter_by = request.args.get('filter_by', None)
        filter_value_min = request.args.get('filter_value_min', None)
        filter_value_max = request.args.get('filter_value_max', None)

        # Check if filter parameters are valid
        if filter_by == 'date' and filter_value_min and filter_value_max:
            try:
                filter_value_min = int(filter_value_min)
                filter_value_max = int(filter_value_max)
                data = [
                    item for item in data 
                    if filter_value_min <= int(item['date'][:4]) <= filter_value_max
                ]
            except ValueError:
                return jsonify({"error": "Invalid date range"}), 400

        # Filter by revenue
        if filter_by == 'revenue' and filter_value_min and filter_value_max:
            try:
                filter_value_min = float(filter_value_min)
                filter_value_max = float(filter_value_max)
                data = [
                    item for item in data 
                    if filter_value_min <= float(item['revenue']) <= filter_value_max
                ]
            except ValueError:
                return jsonify({"error": "Invalid revenue range"}), 400

        # Filter by net income
        if filter_by == 'netIncome' and filter_value_min and filter_value_max:
            try:
                filter_value_min = float(filter_value_min)
                filter_value_max = float(filter_value_max)
                data = [
                    item for item in data 
                    if filter_value_min <= float(item['netIncome']) <= filter_value_max
                ]
            except ValueError:
                return jsonify({"error": "Invalid net income range"}), 400

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
