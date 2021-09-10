import React from "react";
import useStyles from "./styles.js";
import { useForm } from "react-hook-form";
import { Typography, TextField, Paper, Button } from "@material-ui/core";
import { createPosts } from "../../apis/index.js";
import FileBase from "react-file-base64";

const Form = () => {
  const classes = useStyles();

  const { register, handleSubmit, reset, setValue } = useForm();
  const onSubmit = async (data) => {
    try {
      await createPosts(data);
      reset();
      // console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Paper className={classes.paper}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${classes.root} ${classes.form}`}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          label="Creator"
          variant="outlined"
          {...register("creator")}
          fullWidth
        />
        <TextField
          label="Title"
          variant="outlined"
          {...register("title")}
          fullWidth
        />
        <TextField
          label="Message"
          variant="outlined"
          {...register("message")}
          fullWidth
        />
        <TextField
          label="Tags"
          variant="outlined"
          {...register("tags")}
          fullWidth
        />
        <div className={classes.fileInput}>
          {/* <input type="file" accept="image/*" {...register("selectedFile")} /> */}
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setValue("selectedFile", base64);
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={() => reset()}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
