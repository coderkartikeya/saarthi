understand models for further development (backend) 


### **1. User Model**
- **Purpose:** Represents a person using the system. This can be either a doctor or a patient.
- **Fields:**
  - `fullname`: Name of the user.
  - `email`: Unique email address for login and identification.
  - `password`: Encrypted password for authentication.
  - `hospitalAdmitted`: The hospital where the user is admitted (for patients).
  - `role`: Indicates if the user is a 'doctor' or 'patient'.

### **2. Doctor Model**
- **Purpose:** Represents a medical professional working in the hospital.
- **Fields:**
  - `user`: Reference to the `User` model (to link the doctor as a type of user).
  - `name`: Name of the doctor.
  - `specialization`: Medical field of expertise.
  - `contactNumber`: Doctor's phone number.
  - `email`: Unique email address for the doctor.
  - `department`: Reference to the `Department` model (which department the doctor belongs to).
  - `availability`: Doctor's available days and times for consultations.

### **3. Patient Model**
- **Purpose:** Represents a patient admitted to the hospital.
- **Fields:**
  - `user`: Reference to the `User` model (to link the patient as a type of user).
  - `name`: Name of the patient.
  - `dateOfBirth`: Patient's date of birth.
  - `gender`: Patient's gender.
  - `contactNumber`: Patient's phone number.
  - `address`: Patient's address.
  - `medicalHistory`: Any relevant medical history.
  - `admissionDate`: Date when the patient was admitted.
  - `dischargeDate`: Date when the patient was discharged (if applicable).
  - `assignedDoctor`: Reference to the `Doctor` model (the doctor assigned to the patient).

### **4. Department Model**
- **Purpose:** Represents different medical departments within the hospital.
- **Fields:**
  - `name`: Name of the department.
  - `description`: Brief description of the department.
  - `head`: Reference to the `Doctor` model (the head of the department).

### **5. MedicalRecord Model**
- **Purpose:** Stores medical records related to patient care.
- **Fields:**
  - `patient`: Reference to the `Patient` model (the patient to whom the record belongs).
  - `doctor`: Reference to the `Doctor` model (the doctor who created the record).
  - `date`: Date of the medical record entry.
  - `diagnosis`: Diagnosis made by the doctor.
  - `prescription`: Prescribed medication or treatment.
  - `notes`: Additional notes related to the patient's condition.

### **6. Appointment Model**
- **Purpose:** Represents appointments between patients and doctors.
- **Fields:**
  - `patient`: Reference to the `User` model (patient who made the appointment).
  - `doctor`: Reference to the `Doctor` model (doctor for the appointment).
  - `dateTime`: Date and time of the appointment.
  - `status`: Status of the appointment (e.g., Scheduled, Completed, Cancelled).
  - `reason`: Reason for the appointment.
  - `notes`: Additional notes about the appointment.
  - `hospitalName`: Name of the hospital where the appointment is scheduled.

### **Relationships:**
1. **User and Doctor/Patient:** Each doctor and patient is a type of user, so they link to the `User` model.
2. **Doctor and Department:** Doctors are associated with a specific department.
3. **Patient and Doctor:** Patients are assigned to doctors.
4. **MedicalRecord:** Linked to both patients and doctors to track medical history and treatments.
5. **Appointment:** Links patients and doctors for scheduled visits.
