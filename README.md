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
git clone https://github.com/your-username/blog-management-system.git
cd blog-management-system
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
# API Configuration
NUXT_PUBLIC_API_BASE=https://exam-api.dev.mis.cmu.ac.th

# Runtime Configuration
ACCESS_TOKEN_SECRET=yourAccessTokenSecret
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
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
docker build -t blog-management-system .
```

### **2. Run with Docker Compose**

```bash
docker-compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## **Usage**

1. Access the application in your browser.
2. Login with your credentials to start managing blogs.
3. Create, edit, publish, or delete articles as needed.

---

## **Troubleshooting**

- **If you encounter issues with API connectivity:**
  - Check that the `NUXT_PUBLIC_API_BASE` variable in `.env` is correctly configured.
- **If dependencies fail to install:**
  - Ensure you are using the correct Node.js and Yarn versions.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
