import { useState } from 'react';

import Popover from '@mui/material/Popover';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);



  const handleClose = () => {
    setOpen(null);
  };

  return (
    <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
       />
  );
}
