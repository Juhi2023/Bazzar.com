import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateReview } from "../../store/actions/ProductActions/ProductActions";
import { NOTIFICATION_TYPE_ERROR, notify } from "../../utils/notification";
import { ADD_UPDATE_REVIEWS, ADD_UPDATE_REVIEWS_FAIL, ADD_UPDATE_REVIEWS_SUCCESS } from "../../store/constant";

const ReviewModal = ({ open, handleClose, data, model }) => {
  const dispatch = useDispatch();
  const {updateReviewLoader} = useSelector(state=>state.productDetailsReducer)

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (data) {
      setRating(data?.reviews?.find(item=> item.isUserReview)?.rating || 0);
      setReview(data?.reviews?.find(item=> item.isUserReview)?.comment || '');
    }
  }, [data]);

  const handleSubmit = async() => {
    if (model) {
      dispatch({type: ADD_UPDATE_REVIEWS})
      await model.classify(review).then((predictions) => {
        console.log(predictions);
        var result = 0;
        for (let i = 0; i < predictions.length; i++) {
          if (predictions[i].results[0].match === true) {
            result += 1;
          }
        }
        console.log(result);
        if (result === 0) {
          dispatch(
            addUpdateReview({
              rating,
              comment: review,
              productId: data._id,
              onSuccessCallback: () => {
                // reset only after success
                handleClose();
              },
            })
          );
        } else {
          notify(NOTIFICATION_TYPE_ERROR, "Comment has been removed due to being toxic.")
          handleClose();
          dispatch({type: ADD_UPDATE_REVIEWS_SUCCESS})
        }
      });
    }

    
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Leave a Review
        </Typography>

        <Rating
          name="product-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="small"
        />

        <TextField
          label="Your Review"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={{fontSize: '13px'}}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
          <Button size="small" onClick={handleClose}  variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button size="small"
            sx={{width: '100px'}}
            onClick={handleSubmit}
            disabled={!rating || !review}
            variant="contained"
            color="primary"
          >
            {
              updateReviewLoader ?
              <CircularProgress size={15} sx={{color:"white"}} />
              :
              'Submit'
            }
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
