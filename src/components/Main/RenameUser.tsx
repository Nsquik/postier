import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RenameUser.scss";
import { useDispatch } from "react-redux";
import { renameUser } from "../../actions/usersActions";

export interface Props {}

const RenameUser: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(30, "Must be 30 characters or less")
        .matches(/^[a-zA-Z\d\s]+$/, "Only english letters!"),
      lastName: Yup.string()
        .max(30, "Must be 30 characters or less")
        .matches(/^[a-zA-Z\d\s]+$/, "Only english letters!"),
    }),
    onSubmit: (values) => {
      dispatch(renameUser(values));
      formik.resetForm();
    },
  });

  return (
    <form className="rename__form" onSubmit={formik.handleSubmit}>
      <div className="input__container">
        <label className="input__label" htmlFor="firstName">
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ color: "#9c0000" }}>{formik.errors.firstName}</div>
          ) : null}
          First name:
        </label>
        <input
          className="form__input form__input-firstName"
          {...formik.getFieldProps("firstName")}
          data-testid="rename-firstname"
        />
      </div>

      <div className="input__container">
        <label className="input__label" htmlFor="lastName">
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={{ color: "#9c0000" }}>{formik.errors.lastName}</div>
          ) : null}
          Last name:
        </label>
        <input
          className="form__input form__input-lastName"
          {...formik.getFieldProps("lastName")}
          data-testid="rename-lastname"
        ></input>
      </div>

      <button className="form__submit" type="submit" data-testid="rename-button">
        Change
      </button>
    </form>
  );
};

export default RenameUser;
