# ใช้ Base Image ที่เบาและเร็ว
FROM node:16-alpine

# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง Dependencies
RUN yarn

# คัดลอกไฟล์ทั้งหมดไปยัง Container
COPY . .

# ใช้ Command เริ่มต้นสำหรับโหมดพัฒนา
CMD ["yarn", "dev"]

# กำหนด Port ที่ Container จะรับฟัง
EXPOSE 3000
