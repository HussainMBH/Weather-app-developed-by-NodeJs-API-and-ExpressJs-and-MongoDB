# Weather App

## Description
The Weather App is a web application that allows users to get real-time weather information based on city names. It provides features for storing and updating weather data using a MongoDB database and integrates with Nodemailer to send hourly weather reports to users' emails.

## Features
- **Weather Data Management:** Store and update weather data for different cities.
- **Email Notifications:** Send hourly weather reports to users' emails using Nodemailer with Gmail.
- **API Endpoints:** `/weather` for storing and updating weather data.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB (mongoose)
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Email Service:** Nodemailer with Gmail

## Installation
1. github repository link: https://github.com/HussainMBH/Weather-app-developed-by-NodeJs-API-and-ExpressJs-and-MongoDB
1. Clone the repository:
   ```
   git clone https://github.com/HussainMBH/Weather-app-developed-by-NodeJs-API-and-ExpressJs-and-MongoDB.git
   ```
2. Navigate to the project directory:
   ```
   cd weather-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://bahirhussain:782284mbh@cluster0.glbbsog.mongodb.net/<your-database-name>?retryWrites=true&w=majority&appName=Cluster0
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     ```
   - Replace `mongodb+srv://bahirhussain:782284mbh@cluster0.glbbsog.mongodb.net/<your-database-name>?retryWrites=true&w=majority&appName=Cluster0`, `EMAIL_USER`, and `EMAIL_PASS` with your MongoDB URI and Gmail credentials.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the Weather App.
3. Enter a city name and your email in the form to fetch weather data and receive hourly reports.

## API Endpoints
- **POST `/weather`:** Store weather data for a city.
  - Example request body:
    ```json
    {
        "email": "mbahirh624@gmail.com",
        "address": "Colombo",
        "temperature": "22.5",
        "weatherCondition": "Cloudy",
        "date": "2024-07-13T12:00:00Z"
    }
    ```
- **PUT `/weather`:** Update weather data for a city.
  - Example request body:
    ```json
    {
        "email": "mbahirh624@gmail.com",
        "address": "Jaffna",
        "temperature": "23.0",
        "weatherCondition": "Partly Cloudy",
        "date": "2024-07-13T15:00:00Z"
    }
    ```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


To test the routes using Postman, you can create a collection that includes requests for testing your `/weather` endpoints, both for `POST` (store weather data) and `PUT` (update weather data) operations. Here's how you can structure your Postman API collection:

### Postman API Collection Structure

#### 1. Create a New Postman Collection

- Open Postman and click on "New" to create a new collection.
- Name your collection (e.g., "Weather App API Testing").

#### 2. Add Requests to the Collection

##### 2.1. `POST /weather` Endpoint (Store Weather Data)

- Create a request for storing weather data:

  - **Request Type:** POST
  - **URL:** `http://localhost:3000/weather`
  - **Headers:** 
    - `Content-Type: application/json`
  - **Body:** Select "raw" and choose JSON format. Example body:
    ```json
    {
        "email": "mbahirh624@gmail.com",
        "address": "Colombo",
        "temperature": "22.5",
        "weatherCondition": "Cloudy",
        "date": "2024-07-13T12:00:00Z"
    }
    ```
  - **Tests:** Add tests to verify the response (e.g., check for `200 OK` status).

##### 2.2. `PUT /weather` Endpoint (Update Weather Data)

- Create a request for updating weather data:

  - **Request Type:** PUT
  - **URL:** `http://localhost:3000/weather`
  - **Headers:** 
    - `Content-Type: application/json`
  - **Body:** Select "raw" and choose JSON format. Example body:
    ```json
    {
        "email": "mbahirh624@gmail.com",
        "address": "Jaffna",
        "temperature": "23.0",
        "weatherCondition": "Partly Cloudy",
        "date": "2024-07-13T15:00:00Z"
    }
    ```
  - **Tests:** Add tests to verify the response (e.g., check for `200 OK` status).

#### 3. Save and Use the Collection

- Save your collection in Postman.
- Execute the requests to test your Node.js routes (`/weather` endpoints).








To deploy your Weather App on AWS, follow these steps using AWS services:

---

# Deploying the Weather App on AWS

## Prerequisites
- AWS Account: Ensure you have an AWS account with appropriate permissions to create and manage services.
- AWS CLI: Install and configure AWS CLI for command-line access.
- Node.js and npm: Ensure Node.js and npm are installed on your local machine for package management.

## Steps to Deploy

### 1. Create an EC2 Instance
1. **Launch Instance:**
   - Navigate to the AWS Management Console.
   - Go to EC2 and click on "Launch Instance."
   - Choose an Amazon Machine Image (AMI) based on your requirements (e.g., Amazon Linux 2).
   - Select an instance type and configure instance details (e.g., network settings, storage).
   - Add tags and configure security groups to allow inbound traffic on port 80 (HTTP) and 443 (HTTPS).
   - Review and launch the instance, selecting or creating an SSH key pair.

2. **Connect to Instance:**
   - Connect to your instance using SSH:
     ```
     ssh -i your-key.pem ec2-user@instance-public-ip
     ```

### 2. Set Up MongoDB with Amazon DocumentDB (Optional)
- **Amazon DocumentDB:** Set up a managed MongoDB-compatible database using Amazon DocumentDB if preferred over MongoDB Atlas. Configure security groups to allow inbound traffic from your EC2 instance.

### 3. Install Dependencies and Configure Environment
1. **Clone Repository:**
   ```
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the project directory with the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_email_password
     ```
   - Replace `MONGODB_URI`, `EMAIL_USER`, and `EMAIL_PASS` with your MongoDB URI and Gmail credentials.

### 4. Deploy and Run Application
1. **Run the Application:**
   - Start the Node.js server:
     ```
     npm start
     ```
   - Verify that the application is running correctly on `http://instance-public-ip:3000`.

2. **Set Up HTTPS (Optional):**
   - Configure HTTPS using an SSL certificate for secure communication.

### 5. Monitoring and Scaling (Optional)
- **Amazon CloudWatch:** Set up monitoring and alarms for your EC2 instance and application metrics.
- **Auto Scaling:** Configure Auto Scaling groups to automatically adjust the number of instances based on demand.

### 6. Domain Name and DNS (Optional)
- **Route 53:** Register a domain name and configure DNS settings to point to your EC2 instance.

### 7. Testing and Maintenance
- **Postman:** Test your API endpoints to ensure they function correctly.
- **AWS Management Console:** Monitor and maintain your deployed application through the AWS Management Console.

### 8. Security Best Practices
- **IAM Roles:** Use IAM roles with least privilege principles for EC2 instances and other AWS services.
- **Security Groups:** Regularly review and update security groups to restrict access to necessary ports.