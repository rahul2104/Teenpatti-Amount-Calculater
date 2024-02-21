import Dexie from 'dexie';

const db = new Dexie('Vcards');

// Declare tables, IDs and indexes
db.version(1).stores({
    contact: 'id, name, email, designation, companyName, employeeId, aboutUs, profileImage, workEmail, phoneNo, whatsApp, skype, website, instagram, facebook, linkedin, twitter, googleMap'
});

export default db;