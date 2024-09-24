import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { UPDATE_SUBJECT } from "../../client/mutations";
import { GET_TEACHERS } from "../../client/queries";
import { ISubject } from "../../interfaces";

interface UpdateSubjectDialogProps {
  open: boolean;
  onClose: () => void;
  subject: ISubject;
}

const UpdateSubjectDialog: React.FC<UpdateSubjectDialogProps> = ({
  open,
  onClose,
  subject,
}) => {
  const [name, setName] = useState(subject.name);
  const [teacherId, setTeacherId] = useState(subject.teacher.id);

  const { data: teachersData, refetch: refetchTeachers } =
    useQuery(GET_TEACHERS);
  const [updateSubject] = useMutation(UPDATE_SUBJECT, {
    onCompleted: () => {
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSubject({ variables: { id: subject.id, name, teacherId } });
    refetchTeachers();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Subject</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="teacher-label">Teacher</InputLabel>
            <Select
              labelId="teacher-label"
              value={teacherId}
              onChange={(e) => setTeacherId(Number(e.target.value))}
            >
              {teachersData?.getTeachers.map(
                (teacher: { id: number; name: string }) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
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

export default UpdateSubjectDialog;
