## <div> PacMail App Deployment </div>

Dokumen ini berisi garis besar proses deployment dari PacMail yang menggunakan Flask, React.js dan Docker. Proyek ini merupakan bagian dari proyek akhir dari kursus Fundamental DevOps dari pacmann.

## <div> Proses </div>
1. Server Preparation.
2. Compose the App.
3. Create CI/CD Pipeline.
4. Configure web server using Nginx.
5. Create domain name.

## <div> Workflow </div>

### 1. Server Preparation.

Pada proyek ini, saya menggunakan Sistem Operasi Ubuntu yang dijalankan pada EC2 Instance dari Amazon Web Services. Baik server staging maupun production menggunakan tipe instance t3.small. Ada beberapa tahap dalam mempersiapkan server yang akan digunakan:

#### Updating the server

```bash
sudo apt update && sudo apt upgrade
```
#### Install Docker

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install the Docker packages:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Source: [Docker documentation](https://docs.docker.com/engine/install/ubuntu/)

#### Install Nginx

```bash
sudo apt install nginx
```

#### Firewall Configuration

Setelah install NGINX, lakukan konfigurasi firewall dengan cara mengatur port mana saja yang akan digunakan. 

## 2. Compose the App

Selanjutnya kita perlu membuat 

### 1. Create Custom Docker Image

Agar aplikasi dapat berjalan di dalam Docker Container, kita perlu membuat Dockerfile untuk tiap aplikasi yang akan dijalankan di tiap kontainer.

```dockerfile
FROM python:3.10

WORKDIR /backend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD [ "python", "api.py" ]
```
### 2. Create Docker Compose

Selanjutnya kita perlu membuat docker compose agar memudahkan kita dalam melakukan konfigurasi dari service yang akan dijalankan.

```yaml
version: "3.8"

services:
  my-frontend-prod:
    image: node:latest
    container_name: my-frontend-prod
    restart: always
    depends_on:
      - my-backend-prod
      - my-database
    volumes:
      - ./frontend:/frontend
    working_dir: /frontend
    command: ["npm", "start"]
    network_mode: host

  my-backend-prod:
    image: ${APP_IMAGE}:${APP_TAG}
    container_name: my-backend-prod
    restart: always
    depends_on:
      - my-database
    volumes:
      - ./backend:/backend
    network_mode: host

  my-frontend:
    image: node:latest
    container_name: my-frontend
    restart: always
    depends_on:
      - my-backend
      - my-database
    volumes:
      - ./frontend:/frontend
    working_dir: /frontend
    command: ["npm", "start"]
    network_mode: host

  my-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: my-backend
    restart: always
    depends_on:
      - my-database
    volumes:
      - ./backend:/backend
    network_mode: host

  my-database:
    image: postgres:13
    container_name: my-database
    hostname: database
    restart: always
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    network_mode: host

volumes:
  postgres_data:
```

## 3. Create CI/CD Pipeline

Setelah kita sudah mempersiapkan server yang akan digunakan untuk mendeploy aplokasi, langkah selanjutnya kita akan membuat CI/CD Pipeline dengan menggunakan GitHub Actions untuk melakukan otomatisasi.

### 1. Preparation

Yang pertama, kita perlu melindungi `main` branch dari repositori kita. Hal tersebut dilakukan agar proses merge dapat dijalankan jika sebuah pull request sudah disetujui dari collaborator.

### Continuous Integration

### Continuous Delivery and Deployment

## 4. Configuring Web Server using NGINX

## 5. Create Domain Name and Install SSL Certificate

### 1. Create DNS Record

### 2. Instal SSL Certificate