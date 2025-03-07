import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function CreateJobForm({ setJobs }) {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    jobType: '',
    qualifications: '',
    datePosted: dayjs(),
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};


    if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }


    if (!["Full-Time", "Part-Time", "Contract"].includes(formData.jobType)) {
      newErrors.jobType = "Job Type is required";
    }


    if (!formData.qualifications.trim()) {
      newErrors.qualifications = "Qualifications is required";
    }


    if (formData.datePosted.isBefore(dayjs(), 'day')) {
      newErrors.datePosted = "Date Posted must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));


    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, datePosted: newDate }));


    if (!newDate.isBefore(dayjs(), 'day')) {
      setErrors((prev) => ({ ...prev, datePosted: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedData = { ...formData, datePosted: formData.datePosted.format('YYYY-MM-DD') };
    setJobs(formattedData);
    setFormData({
      title: '',
      companyName: '',
      description: '',
      location: '',
      jobType: '',
      qualifications: '',
      datePosted: dayjs(),
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
        Post a New Job
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            sx={{ width: '80%' }}
            error={!!errors.title}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date Posted"
              value={formData.datePosted}
              onChange={handleDateChange}
              sx={{ width: '80%' }}
              error={!!errors.datePosted}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
            sx={{ width: '80%' }}
            error={!!errors.companyName}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ width: '80%' }} error={!!errors.jobType}>
            <InputLabel id="job-type-select">Job Type</InputLabel>
            <Select
              labelId="job-type-select"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            sx={{ width: '80%' }}
            error={!!errors.location}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            sx={{ width: '90%' }}
            multiline
            rows={2}
            error={!!errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            fullWidth
            sx={{ width: '90%' }}
            multiline
            rows={2}
            error={!!errors.qualifications}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            SUBMIT NEW JOB
          </Button>
        </Grid>
        {Object.keys(errors).length > 0 && (
          <Grid item xs={12}>
            <Box sx={{ marginTop: 2, width: '90%' }}>
              <Alert severity="error">
                <strong>Validation Error</strong>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  );
}