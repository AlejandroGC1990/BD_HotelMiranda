export interface User {
    // user_id: number;
    user_name: string;
    user_password: string;
    user_picture: string;
    user_joined: string;
    user_jobDescription: string;
    user_schedule: string[];
    user_contact: string;
    user_status: string;
} 

export const createTableUser= `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  picture VARCHAR(255),
  position VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  joined DATE,
  job_desk TEXT,
  schedule JSON,
  contact VARCHAR(255),
  status ENUM('ACTIVE', 'INACTIVE') NOT NULL
)`;