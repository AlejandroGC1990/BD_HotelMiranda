import { Contact } from "./contact";
import { Room } from "./room";

export interface Booking {
    booking_Id: number;              
    guest_Id: Contact;             
    guest_name: string;              
    guest_orderDate: string;       
    guest_checkIn: string;                 
    guest_checkOut: string;                
    booking_specialRequest: string;          
    room: Room;                      
    room_number: number;             
    room_type: string;               
    room_status: 'Check In' | 'Check Out' | 'In Progress';  
}

export const createTableBooking= 
 ` CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  guest VARCHAR(255),
  picture VARCHAR(255),
  order_date DATE NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  discount DECIMAL(5, 2),
  notes JSON,
  room_id INT,
  status ENUM('Pending', 'Booked', 'Cancelled', 'Refund') NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
)`;