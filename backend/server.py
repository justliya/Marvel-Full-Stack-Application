import mysql.connector
from mysql.connector import Error
from flask import Flask, jsonify, request
from flask_marshmallow import Marshmallow
from marshmallow import fields, ValidationError
from flask_cors import CORS



# Flask application setup
app = Flask(__name__)
ma = Marshmallow(app)
CORS(app)

# Define the Character schema
class CharacterSchema(ma.Schema):
    id = fields.Integer(required=False)
    name = fields.String(required=True)
    alias = fields.String(required=True)
    alignment = fields.String(required=True)
    powers = fields.String(required=True)
    image_url = fields.String(required=True)

    class Meta:
        fields = ("id", "name", "alias", "alignment", "powers", "image_url")

character_schema = CharacterSchema()
characters_schema = CharacterSchema(many=True)

# Database connection parameters
db_name = "marvel"
user = "root"
password = "password"
host = "localhost"

def get_db_connection():
    try:
        # Attempting to establish a connection
        conn = mysql.connector.connect(
            database=db_name,
            user=user,
            password=password,
            host=host
        )

        # Check if the connection is successful
        if conn.is_connected():
            print("Connected to MySQL database successfully")
            return conn

    except Error as e:
        # Handling any connection errors
        print(f"Error: {e}")
        return None

@app.route('/characters', methods=['GET'])
def get_characters():
    try:
        # Establishing connection to the database
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # SQL query to fetch all characters
        query = "SELECT * FROM characters"

        # Executing the query
        cursor.execute(query)

        # Fetching the results and preparing for JSON response
        charcters = cursor.fetchall()

        # Use Marshmallow to format the JSON response
        return characters_schema.jsonify(charcters)

    except Error as e:
        # Handling any errors that occur during the process
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/characters/<name>', methods=['GET'])
def get_character_by_name(name):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor(dictionary=True)

        # Important: Use parameterized query to prevent SQL injection
        query = "SELECT * FROM characters WHERE name = %s"
        cursor.execute(query, (name,))  # Parameter needs to be a tuple

        character = cursor.fetchone()

        if not character:
            return jsonify({"error": "Character not found"}), 404

        return character_schema.jsonify(character)

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route('/characters', methods=['POST'])
def add_character():
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        character_data = character_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # New character details
        new_character = (character_data['name'], character_data['alias'], character_data['alignment'], character_data['powers'], character_data['image_url'])

        # SQL query to add new character
        query = "INSERT INTO characters (name, alias, alignment, powers, image_url) VALUES (%s, %s, %s, %s, %s)"

        # Executing the query
        cursor.execute(query, new_character)
        conn.commit()

        # Successful addition of the new character
        return jsonify({"message": "New character added successfully"}), 201

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/characters/<name>', methods=['PUT'])
def update_character(name):
    try:
        # Validate and deserialize using Marshmallow input data sent by the client
        character_data = character_schema.load(request.json)
    except ValidationError as e:
        print(f"Error: {e}")
        return jsonify(e.messages), 400

    try:
        # Establish database connection
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()

        # Updated character details
        updated_character = (
            character_data['name'],
            character_data['alias'],
            character_data['alignment'],
            character_data['powers'],
            character_data['image_url'],
            name
        )

        # SQL query to update the character's details
        query = """
            UPDATE characters 
            SET name = %s, alias = %s, alignment = %s, powers = %s, image_url = %s 
            WHERE name = %s
        """

        # Execute the query
        cursor.execute(query, updated_character)
        conn.commit()

        # Check if the data actually changed
        if cursor.rowcount > 0:  # If a row was updated
            return jsonify({"message": "Character details updated successfully"}), 200
        else:  # No changes detected
            return jsonify({"message": "No changes detected, character remains the same"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Close database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/characters/<name>', methods=['DELETE'])
def delete_character(name):
    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500
        cursor = conn.cursor()
        character_to_remove = (name, )

        # Check if the character exists in the database
        cursor.execute("SELECT * FROM characters WHERE name = %s", character_to_remove)
        character = cursor.fetchone()
        if not character:
            return jsonify({"error": "Character not found"}), 404

        # If character exists, proceed to delete
        query = "DELETE FROM characters WHERE name = %s"
        cursor.execute(query, character_to_remove)
        conn.commit()

        # Successful delete of character
        return jsonify({"message": "Character removed successfully"}), 200

    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

    finally:
        # Closing the database connection
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)