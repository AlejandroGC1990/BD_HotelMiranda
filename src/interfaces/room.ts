export interface Room {
    room_id: number;
    room_number: number;
    room_type: string;
    room_facilities: string[];
    room_price: number;
    offer_price?: number;
    room_status: 'Check In' | 'Check Out' | 'In Progress';
    room_picture: string;
    room_bedType: string;
}

export const createTableRoom= 
 ` CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_type VARCHAR(255) NOT NULL,
  number INT NOT NULL,
  picture VARCHAR(255),
  bed_type VARCHAR(255),
  room_floor VARCHAR(255),
  facilities JSON,
  rate DECIMAL(10, 2),
  discount DECIMAL(5, 2),
  status ENUM('Available', 'Occupied', 'Maintenance') NOT NULL,
  date_added DATE
)`;