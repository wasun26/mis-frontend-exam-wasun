# **Blog Management System**

A web application for managing blog articles with features such as creating, updating, deleting, and publishing articles.

## **Prerequisites**

Before running the application, ensure you have the following installed:

- **Node.js**: v18 or higher
- **Yarn**: v1.22 or higher
- **Docker**: v20 or higher (optional, for running in containerized environments)

---

## **Installation Steps**

### **1. Clone the Repository**

```bash
git clone https://github.com/wasun26/mis-frontend-exam-wasun.git
cd mis-frontend-exam-wasun
```

### **2. Install Dependencies**

```bash
yarn install
```

---

## **Configuration**

### **Environment Variables**

Create a `.env` file in the root directory and configure the following variables:

```env
NUXT_PUBLIC_APP_NAME=CMU Asset Management
NUXT_NODE_ENV=development
NUXT_PUBLIC_WEB_BASE=http://localhost:3000
NUXT_PUBLIC_WEB_PATH=/login/
NUXT_PUBLIC_API_BASE=https://exam-api.dev.mis.cmu.ac.th
NUXT_PUBLIC_API_PATH=/api/

PORT=3000
HOST=localhost
```

---

## **Run the Application**

### **1. Development Mode**

For local development:

```bash
yarn dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

### **2. Production Mode**

Build the project for production and serve it:

```bash
yarn build
yarn start
```

---

## **Run with Docker (Optional)**

### **1. Build the Docker Image**

```bash
docker build -t mis-frontend-exam-wasun .
```

### **2. Run with Docker Compose**

```bash
docker-compose --build up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
