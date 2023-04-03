import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const initialValues = {
  questionType: "",
  question: "",
  startDate: "",
  endDate: "",
  options: [],
};

const onSubmit = (values,onSubmitProps) => {
  console.log("finalData", values);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  questionType: Yup.string().required("Required !"),
  question: Yup.string().required("Required !"),
  startDate: Yup.string().required("Required !"),
  endDate: Yup.string().required("Required !"),
});

function App() {
  const parseBoolean = (value) => {
    return value === "true";
  };
  return (
    <div className="container h-full w-full mt-8 flex justify-center items-center">
      <div className="min-h-[500px] min-w-[500px] rounded-md border-black shadow-lg flex flex-col p-6">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            // handleChange,
            // touched,
            // errors,
            // handleBlur,
            // setFieldValue,
          }) => (
            <Form>
              <div className="flex flex-col">
                <lable className="font-bold text-md">
                  Select Question Type
                </lable>
                <Field
                  as="select"
                  name="questionType"
                  className="border-2 p-2 rounded-lg my-2"
                >
                  <option value="">Select a Option</option>
                  <option value="Multi Choice Question">
                    Multi Choice Question
                  </option>
                  <option value="True/False">True/False</option>
                </Field>
              </div>

              <div className="flex flex-col">
                <Field
                  type="text"
                  placeholder="Enter a Question"
                  className="border-2 p-2 rounded-lg my-2"
                  name="question"
                />
                <div className="flex flex-col">
                  <lable>Start Time</lable>
                  <Field
                    name="startDate"
                    type="datetime-local"
                    className="border-2 p-2 rounded-lg my-2"
                  />
                </div>
                <div className="flex flex-col">
                  <lable>End Time</lable>
                  <Field
                    type="datetime-local"
                    name="endDate"
                    className="border-2 p-2 rounded-lg my-2"
                  />
                </div>
              </div>
              {values.questionType === "Multi Choice Question" ? (
                <div>
                  <div className="flex  gap-2">
                    <FieldArray name="options">
                      {(FieldArrayProps) => {
                        const { push, remove, form } = FieldArrayProps;
                        const { values } = form;
                        const { options } = values;
                        return (
                          <div className="flex flex-col">
                            {options.map((value, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex gap-2 justify-center items-center"
                                >
                                  <Field
                                    type="checkbox"
                                    name={`options[${index}].isCorrect`}
                                  />
                                  <Field
                                    type="text"
                                    name={`options[${index}].question`}
                                    className="border-2 p-2 rounded-lg my-2"
                                    placeholder="Enter Question"
                                  />
                                  <Field
                                    type="number"
                                    name={`options[${index}].points`}
                                    className="border-2 p-2 rounded-lg my-2"
                                    placeholder="Enter Points"
                                  />

                                  <button
                                    className="bg-red-500 text-white h-10 w-10 rounded-full"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                </div>
                              );
                            })}
                            <button
                              className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
                              onClick={() => {
                                push({
                                  isCorrect: false,
                                  points: "",
                                  question: "",
                                });
                                type = "button";
                              }}
                            >
                              {values.options.length <= 0
                                ? "Add a option"
                                : "Add more options"}
                            </button>
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
              ) : values.questionType === "True/False" ? (
                <div>
                  <div className="flex  gap-2">
                    <FieldArray name="options">
                      {(FieldArrayProps) => {
                        const { push, remove, form } = FieldArrayProps;
                        const { values, setFieldValue } = form;
                        console.log("values", values);
                        return (
                          <div className="flex flex-col">
                            {values.options.map((option, index) => {
                              return (
                                <div
                                  key={option.id}
                                  className="flex gap-2 justify-center items-center"
                                >
                                  <Field
                                    type="radio"
                                    name={`options.${index}.isCorrect`}
                                    value="true"
                                    checked={option.isCorrect === true}
                                    onChange={() => {
                                      const updatedOptions = [
                                        ...values.options,
                                      ];
                                      updatedOptions.forEach((opt) => {
                                        opt.isCorrect = false;
                                      });
                                      updatedOptions[index].isCorrect = true;
                                      setFieldValue("options", updatedOptions);
                                    }}
                                    parse={parseBoolean}
                                  />

                                  <Field
                                    type="text"
                                    name={`options[${index}].question`}
                                    className="border-2 p-2 rounded-lg my-2"
                                    placeholder="Enter Question"
                                  />
                                  <Field
                                    type="number"
                                    name={`options[${index}].points`}
                                    className="border-2 p-2 rounded-lg my-2"
                                    placeholder="Enter Points"
                                  />

                                  <button
                                    className="bg-red-500 text-white h-10 w-10 rounded-full"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                </div>
                              );
                            })}
                            <button
                              type="button"
                              className="bg-green-500 text-white py-2 px-4 rounded-md mt-2 "
                              onClick={() => {
                                push({
                                  isCorrect: false,
                                  points: "",
                                  question: "",
                                  id: Date.now(),
                                });
                              }}
                            >
                              {values.options.length <= 0
                                ? "Add a option"
                                : "Add more options"}
                            </button>
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
              ) : null}

              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md mt-5"
                type="submit"
              >
                Add exam
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
