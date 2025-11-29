import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import deleteIcon from '../../assets/images/delete.svg'
import './DeleteModal.scss'

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

export default function DeleteModal({deleteModal, setDeleteModal, name, onDelete}) {
  const handleClose = () => setDeleteModal(false);

  return (
    <div>
      <Modal
       sx={{".MuiBox-root": {
                border: "none", borderRadius: "10px", outline: "none"
            }
        }}
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="delete-modal">
            <div className="icon">
              <img src={deleteIcon} alt="" />
            </div>
            <div className="my-4">
              <div className="title">Alert!</div>
                {`Are you sure, you want to delete ${name}?`}
              </div>
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <div data-testid="cancel-btn" className="button" onClick={()=>{setDeleteModal(false)}}>Cancel</div>
                <div className="vhr"></div>
                <div data-testid="confirm-del-btn" className="button delete" onClick={onDelete}>Delete</div>
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}