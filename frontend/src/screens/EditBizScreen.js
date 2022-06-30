import { Save } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editBiz } from "../actions/authAction";
import CustomAlert from "../components/layout/CustomAlert";
import CustomHelmet from "../components/layout/CustomHelmet";
import ImagePreview from "../components/layout/ImagePreview";
import CreateProductContainer from "../components/product/CreateProductContainer";
import { UPDATE_BIZ_RESET } from "../reducers/types/authTypes";

const CreateBizScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, success } = useSelector((state) => state.editBiz);

  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState(
    userInfo && userInfo.yourBiz ? userInfo.yourBiz : {}
  );
  useEffect(() => {
    if (!userInfo) history.push(`/login?redirect=profile`);
    if (success) {
      history.push("/profile");
    }
  }, [userInfo, history, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBiz(values));
  };

  return (
    <Container>
      <CustomHelmet title="Edit Biz" desc="Edit your Business" />
      <br />
      <CreateProductContainer>
        <Typography variant="h5" component="h5">
          Edit Business Profile
        </Typography>
        <Typography sx={{ fontSize: 13 }}>
          To be able to sell on steeldalal.com you have to upload scanned copy
          of the following documents so that we can verify that you are legit.
          We take pride in ensuring our buyers get the best.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid sx={{ mt: 3, mb: 2 }} container spacing={2}>
            <Grid item xs={12} md={6}>
              {values.gstCertificate ? (
                <ImagePreview
                  title="GST Certificate *"
                  file={values.gstCertificate}
                  source={
                    typeof values.gstCertificate !== "string" ? false : true
                  }
                  handleEdit={() =>
                    setValues({ ...values, gstCertificate: null })
                  }
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  name="gstCertificate"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.files[0],
                    })
                  }
                  fullWidth
                  type="file"
                  accept="image/*"
                  label="GST Certificate"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {values.panCard ? (
                <ImagePreview
                  title="Pan Card *"
                  source={typeof values.panCard !== "string" ? false : true}
                  file={values.panCard}
                  handleEdit={() => setValues({ ...values, panCard: null })}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  name="panCard"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.files[0],
                    })
                  }
                  fullWidth
                  type="file"
                  accept="image/*"
                  label="Pan Card"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {values.aadharCard ? (
                <ImagePreview
                  title="Aadhar Card *"
                  source={typeof values.aadharCard !== "string" ? false : true}
                  file={values.aadharCard}
                  handleEdit={() => setValues({ ...values, aadharCard: null })}
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="file"
                  accept="image/*"
                  label="Aadhar Card"
                  name="aadharCard"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.files[0],
                    })
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {values.cancelledCheque ? (
                <ImagePreview
                  title="Cancelled Chequed"
                  source={
                    typeof values.cancelledCheque !== "string" ? false : true
                  }
                  file={values.cancelledCheque}
                  handleEdit={() =>
                    setValues({ ...values, cancelledCheque: null })
                  }
                />
              ) : (
                <TextField
                  variant="outlined"
                  required
                  name="cancelledCheque"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.files[0],
                    })
                  }
                  fullWidth
                  type="file"
                  accept="image/*"
                  label="Cancelled Cheque"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            </Grid>
          </Grid>
          {loading && <CustomAlert type="success" text="Saving... Biz" />}

          {error && (
            <CustomAlert
              type="error"
              text={error}
              handleClose={() => dispatch({ type: UPDATE_BIZ_RESET })}
            />
          )}
          {success && (
            <CustomAlert
              type="success"
              text="Created"
              handleClose={() => dispatch({ type: UPDATE_BIZ_RESET })}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={<Save />}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </CreateProductContainer>
    </Container>
  );
};

export default CreateBizScreen;
