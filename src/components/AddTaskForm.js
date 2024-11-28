import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

/**
 * AddTaskForm Component
 *
 * A form component for creating and submitting a new task. Utilizes Material-UI components
 * for a clean and styled UI. Handles form validation and state management for task attributes. */

//onAdd - Callback function triggered when a new task is successfully submitted.
//onAdd function is defined in App.js line-70

const AddTaskForm = ({ onAdd }) => {
  const [name, setName] = useState(""); //Task name
  const [description, setDescription] = useState(""); //Task description
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(""); //error message for form validation
  const [success, setSuccess] = useState(false); //success submit task

  //FORM SUBMISSION HANDLER
  /**
   * Handles form submission.
   * Validates that all required fields are filled before calling the onAdd callback.
   * If validation fails, an error message is displayed.
   * After submission, form fields are reset to their default values.*/

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate that all fields are filled. If any are empty, set an error message
    if (!name || !description || !dueDate || !assignedTo) {
      setError("All fields are required");
      return;
    }

    //After sending value to app, making it ready for the next input by resetting it
    onAdd({ name, description, dueDate, assignedTo, status });
    // Reset the form fields after submission
    setName("");
    setDescription("");
    setDueDate("");
    setAssignedTo("");
    setStatus("in-progress");
    setError("");
    setSuccess(true);
  };
  //Form Rendering
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Divider>
        <Chip label="Add Task" size="small" />
      </Divider>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Your task has been added. You can add another task
        </Alert>
      )}

      <TextField
        label="Task Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={error}
      />
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        error={error}
      />
      <TextField
        label="Assigned To"
        variant="outlined"
        fullWidth
        margin="normal"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        error={error}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          error={error}
        >
          <MenuItem value="not-started">Not Started</MenuItem>
          <MenuItem value="in-progress">In-Progress</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Submit Task
      </Button>
      <Divider sx={{ pb: "16px" }} />
    </Box>
  );
};

export default AddTaskForm;
