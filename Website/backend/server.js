const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// CORS Configuration - MUST BE FIRST middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests explicitly
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
  } else {
    next();
  }
});
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'RESUME-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Only ${allowedTypes.join(', ')} are allowed.`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/redsea_careers';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Application Schema - UPDATED WITH ALL NEW FIELDS
const applicationSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [50, 'Middle name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true
  },
  homeAddress1: {
    type: String,
    required: [true, 'Home address is required'],
    trim: true
  },
  homeAddress2: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  militaryStatus: {
    type: String,
    required: [true, 'Military status is required'],
    enum: ['exempted', 'completed', 'postponed', 'not-applicable']
  },
  maritalStatus: {
    type: String,
    required: [true, 'Marital status is required'],
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  
  // Education Information
  certificateName: {
    type: String,
    required: [true, 'Certificate name is required'],
    trim: true
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation year is required'],
    min: [1950, 'Graduation year must be after 1950'],
    max: [2030, 'Graduation year cannot be in the future']
  },
  major: {
    type: String,
    required: [true, 'Major is required'],
    trim: true
  },
  university: {
    type: String,
    required: [true, 'University is required'],
    trim: true
  },
  
  // Professional Information
  currentEmployer: {
    type: String,
    trim: true
  },
  currentPosition: {
    type: String,
    trim: true
  },
  currentSalary: {
    type: String,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    required: [true, 'Years of experience is required'],
    min: [0, 'Years of experience cannot be negative']
  },
  noticePeriod: {
    type: String,
    trim: true
  },
  extraCertificates: {
    type: String,
    trim: true
  },
  
  // File upload
  resumePath: {
    type: String,
    required: true
  },
  resumeOriginalName: {
    type: String,
    required: true
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  }
});

const Application = mongoose.model('Application', applicationSchema);

// Helper function to clean up files
function cleanupFile(file) {
  if (file && fs.existsSync(file.path)) {
    try {
      fs.unlinkSync(file.path);
      console.log('🗑️ Deleted uploaded file:', file.path);
    } catch (unlinkError) {
      console.error('Error deleting file:', unlinkError);
    }
  }
}

// Submit Application - UPDATED FOR NEW FIELDS
app.post('/api/applications', upload.single('resume'), async (req, res) => {
  console.log('📥 POST /api/applications - Request received');
  console.log('📋 Body:', req.body);
  console.log('📎 File:', req.file ? `File received: ${req.file.originalname}` : 'No file');

  try {
    // Check if file exists
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ 
        success: false, 
        message: 'Resume file is required',
        error: 'RESUME_FILE_REQUIRED'
      });
    }

    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      email,
      contactNumber,
      homeAddress1,
      homeAddress2,
      nationality,
      gender,
      militaryStatus,
      maritalStatus,
      certificateName,
      graduationYear,
      major,
      university,
      currentEmployer,
      currentPosition,
      currentSalary,
      yearsOfExperience,
      noticePeriod,
      extraCertificates
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'email', 'contactNumber',
      'homeAddress1', 'nationality', 'gender', 'militaryStatus', 'maritalStatus',
      'certificateName', 'graduationYear', 'major', 'university', 'yearsOfExperience'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]?.trim()) {
        cleanupFile(req.file);
        return res.status(400).json({ 
          success: false, 
          message: `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`,
          error: `${field.toUpperCase()}_REQUIRED`
        });
      }
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      cleanupFile(req.file);
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address',
        error: 'INVALID_EMAIL'
      });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({ 
      email: email.trim().toLowerCase() 
    });

    if (existingApplication) {
      cleanupFile(req.file);
      return res.status(409).json({
        success: false,
        message: 'An application with this email already exists',
        error: 'DUPLICATE_APPLICATION'
      });
    }

    // Create new application with all fields
    const application = new Application({
      firstName: firstName.trim(),
      middleName: middleName?.trim() || '',
      lastName: lastName.trim(),
      dateOfBirth: new Date(dateOfBirth),
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      homeAddress1: homeAddress1.trim(),
      homeAddress2: homeAddress2?.trim() || '',
      nationality: nationality.trim(),
      gender: gender,
      militaryStatus: militaryStatus,
      maritalStatus: maritalStatus,
      certificateName: certificateName.trim(),
      graduationYear: parseInt(graduationYear),
      major: major.trim(),
      university: university.trim(),
      currentEmployer: currentEmployer?.trim() || '',
      currentPosition: currentPosition?.trim() || '',
      currentSalary: currentSalary?.trim() || '',
      yearsOfExperience: parseFloat(yearsOfExperience),
      noticePeriod: noticePeriod?.trim() || '',
      extraCertificates: extraCertificates?.trim() || '',
      resumePath: req.file.path,
      resumeOriginalName: req.file.originalname
    });

    // Save to database
    const savedApplication = await application.save();
    console.log('✅ Application saved successfully:', savedApplication._id);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: savedApplication._id.toString(),
      data: {
        id: savedApplication._id,
        firstName: savedApplication.firstName,
        lastName: savedApplication.lastName,
        email: savedApplication.email,
        submittedAt: savedApplication.submittedAt
      }
    });

  } catch (error) {
    console.error('❌ Error submitting application:', error);
    
    // Clean up uploaded file if error occurs
    if (req.file) {
      cleanupFile(req.file);
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An application with this email already exists',
        error: 'DUPLICATE_APPLICATION'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Please check your input data',
        errors: errors
      });
    }
    
    // Handle cast errors (e.g., invalid date)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format provided',
        error: 'INVALID_DATA_FORMAT'
      });
    }
    
    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again.',
      error: 'SERVER_ERROR'
    });
  }
});

// Get all applications (Admin)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get single application by ID
app.get('/api/applications/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid application ID'
      });
    }

    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update application status (Admin)
app.patch('/api/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid application ID'
      });
    }

    if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// Multer error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
        error: 'FILE_TOO_LARGE'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
      error: 'UPLOAD_ERROR'
    });
  }
  
  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: error.message,
      error: 'INVALID_FILE_TYPE'
    });
  }
  
  next(error);
});

// General error handling middleware
app.use((error, req, res, next) => {
  console.error('💥 Server Error:', error);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'INTERNAL_SERVER_ERROR'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Server shutting down...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});