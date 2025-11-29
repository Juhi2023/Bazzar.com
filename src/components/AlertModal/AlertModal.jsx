import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './AlertModal.scss'
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function AlertModal({alertModal, setAlertModal, name, onOK, title, loading}) {
  const handleClose = () => setAlertModal(false);

  return (
    <div>
      <Modal
       sx={{".MuiBox-root": {
                border: "none", borderRadius: "10px", outline: "none"
            }
        }}
        open={alertModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style}>
          <div className="alert-modal">
            {
              loading &&
              <div className="loader">
                <CircularProgress size={60} thickness={6} sx={{color: 'gray', opacity: 1}}/>
              </div>
            }
            <div className="my-4">
              <div className="title mb-3">Alert!</div>
                {title}
              </div>
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <div data-testid="cancel-btn" className="button" onClick={()=>{setAlertModal(false)}}>Cancel</div>
                <div className="vhr"></div>
                <div data-testid="confirm-del-btn" className="button delete" onClick={onOK}>
                  Yes, Continue

                </div>
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}