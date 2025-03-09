// components/AddLocationCard.tsx
"use client";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface AddLocationCardProps {
  onAddLocation: (city: string) => void;
}

export default function AddLocationCard({ onAddLocation }: AddLocationCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setCity("");
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    onAddLocation(city);
    handleClose();
  };

  return (
    <>
    
      <div 
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md w-full shadow-lg border border-white/20 h-[40rem]"
        onClick={handleOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4">
        <AddIcon 
  style={{ fontSize: 200 }} // Size in pixels
  className="text-white/70 rounded-full bg-white/20 p-2"
/>
          <p className="text-white/80 text-center text-lg">Add new location</p>
        </div>
      </div>

    
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle className="text-white">Add New Location</DialogTitle>
        <DialogContent className="bg-gray-900">
          <form onSubmit={handleSubmit} className="mt-4">
            <TextField
              fullWidth
              label="Enter the City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={!!error}
              helperText={error}
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff", borderColor: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions className="bg-gray-900">
          <Button onClick={handleClose} className="text-white">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="text-white bg-blue-500 hover:bg-blue-600">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}