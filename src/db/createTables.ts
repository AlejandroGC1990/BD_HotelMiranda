// import { createTableUser } from 'interfaces/user';
import { connectDB } from './db';
import { createTableContact } from 'interfaces/contact';
import { createTableRoom } from 'interfaces/room';
import { createTableBooking } from 'interfaces/booking';
import { createTableUser } from 'interfaces/user';

//! USAR node dist/src/database/createTables.js UNA VEZ PARA
//! CREAR LAS TABLAS EN LA BASE DE DATOS

const createTable = async () =>{
  const connection = await connectDB();

  try {
      await connection.execute(createTableUser)
      await connection.execute(createTableContact)
      await connection.execute(createTableRoom)
      await connection.execute(createTableBooking)

      console.log('Create Table SuccessFully');
  } catch (error) {
      console.log('Error creating tables', error);
  } finally {
      connection.end();
  }
};

createTable().catch(err => console.error('error creating tables:', err));