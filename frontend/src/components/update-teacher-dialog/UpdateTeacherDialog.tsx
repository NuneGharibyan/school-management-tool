import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { UPDATE_TEACHER } from "../../client/mutations";
import { ITeacher } from "../../interfaces";

interface UpdateTeacherDialogProps {
  open: boolean;
  onClose: () => void;
  teacher: ITeacher;
}

const UpdateTeacherDialog: React.FC<UpdateTeacherDialogProps> = ({
  open,
  onClose,
  teacher,
}) => {
  const [name, setName] = useState(teacher.name);
  const [updateTeacher] = useMutation(UPDATE_TEACHER, {
    onCompleted: () => {
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTeacher({ variables: { id: teacher.id, name } });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Teacher</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Teacher Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTeacherDialog;
