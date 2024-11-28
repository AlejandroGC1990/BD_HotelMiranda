export interface Contact {
    guest_idReview: number;           
    guest_timeDateReview: string;     
    guest_DateReview: string;          
    guest_name: string;                
    guest_email: string;               
    guest_phone: string;              
    guest_rateReview: number;     
    guest_commentReview: string;    
    guest_statusReview: string;      
    guest_checkIn: string;       
    guest_checkInTime: string;    
    guest_checkOut: string;           
    guest_checkOutTime: string;        
    guest_orderDateTime: string;      
    guest_orderDate: string;                  
    guest_room_state: string;         
}

export const createTableContact = 
`CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  comment TEXT,
  archived BOOLEAN NOT NULL DEFAULT FALSE
)`;