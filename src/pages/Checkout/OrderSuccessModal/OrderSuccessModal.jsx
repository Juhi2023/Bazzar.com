import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './OrderSuccessModal.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  pb: 2
};

export default function OrderSuccessModal({orderSuccessModal, setOrderSuccessModal, name, onOK}) {
  const handleClose = () => setOrderSuccessModal(false);

  return (
    <div>
      <Modal
       sx={{".MuiBox-root": {
                border: "none", borderRadius: "10px", outline: "none"
            }
        }}
        open={orderSuccessModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="order-success-modal">

            <div className="my-4">
              <div className="title mb-3">Order placed successfully!</div>
                <svg stroke="green" fill="green" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="60px" width="60px" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"></path></svg>
              </div>
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <div data-testid="confirm-del-btn" className="button delete" onClick={onOK}>View Orders</div>
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}