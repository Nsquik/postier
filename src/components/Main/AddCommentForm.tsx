import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddCommentForm.scss";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/commentsActions";

export interface Props {
  postId: number;
}

const AddCommentForm: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      body: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .matches(/^[a-zA-Z\d\s]+$/, "Only english letters!")
        .required("Required"),
      body: Yup.string()
        .max(200, "Must be 200 characters or less")
        .matches(/^[a-zA-Z\d\s]+$/, "Only english letters!")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addComment(props.postId, values));
      formik.resetForm();
    },
  });

  return (
    <form className="comment__form" onSubmit={formik.handleSubmit}>
      <div className="form__user">
        <div className="input__container">
          <label className="input__label" htmlFor="name">
            Your name:
          </label>
          <input className="form__input form__input-name" {...formik.getFieldProps("name")} />
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "#9c0000" }}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="input__container">
          <label className="input__label" htmlFor="email">
            Email:
          </label>
          <input className="form__input form__input-email" {...formik.getFieldProps("email")}></input>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "#9c0000" }}>{formik.errors.email}</div>
          ) : null}
        </div>
      </div>

      <div className="form__comment">
        <label htmlFor="body">Comment:</label>
        <TextArea className="form__input form__input-body" {...formik.getFieldProps("body")}></TextArea>
        {formik.touched.body && formik.errors.body ? (
          <div style={{ color: "#9c0000" }}>{formik.errors.body}</div>
        ) : null}
      </div>

      <button className="form__submit" type="submit">
        Send comment
      </button>
    </form>
  );
};

export default AddCommentForm;
